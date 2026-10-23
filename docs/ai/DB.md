# DB — Nexora (PostgreSQL)
Estado: **diseño** → pasa a `backend/db/migrations/001_init.sql` (copiar tal cual). Migraciones: SQL numerado + tabla `schema_migrations`; runner `npm run migrate`. Seed: `npm run seed`.

## Reglas del modelo
- Contenido de RAWG se guarda como **snapshot compartido** en `games` (clave estable `rawg_id`); lo personal vive en `library_items` etc.
- Una fila `library_items` por (usuario, juego): contiene estado, favorito, puntuación, horas y plataforma. Puntuar, favoritear o reseñar un juego que no está en la biblioteca lo **agrega** con estado `want_to_play` (upsert implícito).
- Reseñas, colecciones y actividad son privadas del usuario (la consigna exige separación total).

## Esquema
```sql
CREATE TABLE users (
  id            SERIAL PRIMARY KEY,
  username      VARCHAR(30)  NOT NULL UNIQUE,
  email         VARCHAR(255) NOT NULL UNIQUE,
  password_hash TEXT         NOT NULL,
  avatar_url    TEXT,
  bio           VARCHAR(300) NOT NULL DEFAULT '',
  preferences   JSONB        NOT NULL DEFAULT '{}',   -- {favoriteGenres:[], favoritePlatforms:[], theme:'dark'}
  created_at    TIMESTAMPTZ  NOT NULL DEFAULT now()
);

CREATE TABLE games (
  id         SERIAL PRIMARY KEY,
  rawg_id    INTEGER NOT NULL UNIQUE,
  title      TEXT    NOT NULL,
  cover_url  TEXT,
  released   DATE,
  genres     TEXT[]  NOT NULL DEFAULT '{}',
  platforms  TEXT[]  NOT NULL DEFAULT '{}',
  metacritic SMALLINT
);

CREATE TABLE library_items (
  id           SERIAL PRIMARY KEY,
  user_id      INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  game_id      INTEGER NOT NULL REFERENCES games(id),
  status       TEXT    NOT NULL DEFAULT 'want_to_play'
               CHECK (status IN ('want_to_play','playing','completed','abandoned')),
  is_favorite  BOOLEAN NOT NULL DEFAULT false,
  rating       SMALLINT CHECK (rating BETWEEN 1 AND 10),
  hours_played NUMERIC(6,1) NOT NULL DEFAULT 0 CHECK (hours_played >= 0),
  platform     TEXT,                       -- plataforma en la que lo juega el usuario
  finished_at  TIMESTAMPTZ,                -- se setea al pasar a 'completed'
  added_at     TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at   TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, game_id)
);
CREATE INDEX idx_library_user_status ON library_items (user_id, status);

CREATE TABLE reviews (
  id         SERIAL PRIMARY KEY,
  user_id    INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  game_id    INTEGER NOT NULL REFERENCES games(id),
  body       TEXT    NOT NULL CHECK (char_length(body) BETWEEN 1 AND 2000),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, game_id)
);

CREATE TABLE collections (
  id          SERIAL PRIMARY KEY,
  user_id     INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  name        VARCHAR(60)  NOT NULL,
  description VARCHAR(300) NOT NULL DEFAULT '',
  created_at  TIMESTAMPTZ  NOT NULL DEFAULT now(),
  UNIQUE (user_id, name)
);

CREATE TABLE collection_items (
  collection_id INTEGER NOT NULL REFERENCES collections(id) ON DELETE CASCADE,
  game_id       INTEGER NOT NULL REFERENCES games(id),
  added_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
  PRIMARY KEY (collection_id, game_id)
);

CREATE TABLE activity (
  id        BIGSERIAL PRIMARY KEY,
  user_id   INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  type      TEXT NOT NULL CHECK (type IN (
    'library_add','library_remove','status_change','favorite_add','favorite_remove',
    'rating_set','review_save','review_delete','collection_create','collection_delete',
    'collection_add','collection_remove','profile_update')),
  game_id   INTEGER REFERENCES games(id) ON DELETE SET NULL,
  meta      JSONB NOT NULL DEFAULT '{}',   -- {from:'playing',to:'completed'} / {collectionName:'…'} / {rating:9}
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX idx_activity_user_date ON activity (user_id, created_at DESC);
```
`updated_at`: se actualiza desde el modelo (`SET updated_at = now()`). Cada acción que cambia datos escribe una fila en `activity` **en la misma transacción**.

## Estadísticas (R7) — 8 indicadores, `GET /api/stats`, todo calculado por SQL
| # | Indicador | Fuente |
|---|---|---|
| 1 | Juegos terminados y % de avance (completed / total) | `library_items` |
| 2 | Distribución por estado (4 estados) | `GROUP BY status` |
| 3 | Géneros favoritos (top 5) | `unnest(games.genres)` sobre la biblioteca |
| 4 | Plataformas más usadas | `GROUP BY library_items.platform` |
| 5 | Puntuación promedio + distribución 1–10 | `AVG(rating)`, `GROUP BY rating` |
| 6 | Horas totales y top 5 juegos por horas | `SUM/ORDER BY hours_played` |
| 7 | Juegos terminados por mes (últimos 12) | `date_trunc('month', finished_at)` |
| 8 | Top 5 mejor puntuados | `ORDER BY rating DESC` |
Extras de resumen: cantidad de reseñas, colecciones y favoritos.

## Seed de demo (T22) — cuenta `demo`
≥10 juegos reales (con `rawg_id` válidos) en ≥3 estados, ≥5 favoritos, ≥5 puntuaciones, ≥3 reseñas, 3 colecciones, avatar+bio+preferencias, ~20 filas de actividad con fechas escalonadas, `finished_at` repartidos en varios meses. Password demo **no** va en el repo (se lee de env al sembrar o se pasa al docente por su canal).

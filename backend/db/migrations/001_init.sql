-- =========================================================
-- Nexora — 001_init.sql
-- Estructura inicial de la base (PostgreSQL).
-- Es una migración: corre una sola vez con `npm run migrate`.
-- No tiene DROP TABLE a propósito: correrla en producción no borra datos.
-- =========================================================


-- ---------------------------------------------------------
-- USERS
-- ---------------------------------------------------------
CREATE TABLE users (
  id            SERIAL PRIMARY KEY,
  username      VARCHAR(30)  NOT NULL UNIQUE,
  email         VARCHAR(255) NOT NULL UNIQUE,   -- se guarda en minúsculas (lo normaliza el back)
  password_hash TEXT         NOT NULL,          -- hash bcrypt, nunca la contraseña
  display_name  VARCHAR(80),
  avatar_url    TEXT,
  bio           VARCHAR(300) NOT NULL DEFAULT '',
  created_at    TIMESTAMPTZ  NOT NULL DEFAULT now(),

  CONSTRAINT chk_username_length CHECK (char_length(username) >= 3)
);


-- ---------------------------------------------------------
-- USER_PREFERENCES
-- Géneros y plataformas favoritas del usuario, una fila por valor.
-- Ejemplo: kind = 'genre', value = 'RPG' · kind = 'platform', value = 'PC'
-- ---------------------------------------------------------
CREATE TABLE user_preferences (
  id      SERIAL PRIMARY KEY,
  user_id INTEGER      NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  kind    VARCHAR(20)  NOT NULL CHECK (kind IN ('genre', 'platform')),
  value   VARCHAR(100) NOT NULL,

  UNIQUE (user_id, kind, value)
);


-- ---------------------------------------------------------
-- GAMES
-- Copia mínima de los datos de RAWG, compartida entre usuarios.
-- rawg_id es el id del juego en RAWG (clave estable).
-- ---------------------------------------------------------
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


-- ---------------------------------------------------------
-- LIBRARY_ITEMS
-- Una fila por juego en la biblioteca de un usuario.
-- Acá viven estado, favorito, puntuación, horas y plataforma.
-- ---------------------------------------------------------
CREATE TABLE library_items (
  id           SERIAL PRIMARY KEY,
  user_id      INTEGER      NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  game_id      INTEGER      NOT NULL REFERENCES games(id),
  status       VARCHAR(20)  NOT NULL DEFAULT 'want_to_play'
               CHECK (status IN ('want_to_play', 'playing', 'completed', 'abandoned')),
  is_favorite  BOOLEAN      NOT NULL DEFAULT false,
  rating       SMALLINT     CHECK (rating BETWEEN 1 AND 10),        -- NULL = sin puntuar
  hours_played NUMERIC(6,1) NOT NULL DEFAULT 0 CHECK (hours_played >= 0),
  platform     VARCHAR(100),                 -- en qué plataforma lo juega este usuario
  finished_at  TIMESTAMPTZ,                  -- se setea al pasar a 'completed'
  added_at     TIMESTAMPTZ  NOT NULL DEFAULT now(),
  updated_at   TIMESTAMPTZ  NOT NULL DEFAULT now(),

  UNIQUE (user_id, game_id)
);


-- ---------------------------------------------------------
-- REVIEWS
-- Una sola reseña por usuario y juego.
-- ---------------------------------------------------------
CREATE TABLE reviews (
  id         SERIAL PRIMARY KEY,
  user_id    INTEGER     NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  game_id    INTEGER     NOT NULL REFERENCES games(id),
  body       TEXT        NOT NULL CHECK (char_length(body) BETWEEN 1 AND 2000),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),

  UNIQUE (user_id, game_id)
);


-- ---------------------------------------------------------
-- COLLECTIONS
-- ---------------------------------------------------------
CREATE TABLE collections (
  id          SERIAL PRIMARY KEY,
  user_id     INTEGER      NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  name        VARCHAR(60)  NOT NULL,
  description VARCHAR(300) NOT NULL DEFAULT '',
  created_at  TIMESTAMPTZ  NOT NULL DEFAULT now(),

  UNIQUE (user_id, name)
);


-- ---------------------------------------------------------
-- COLLECTION_ITEMS
-- Tabla intermedia: una colección tiene muchos juegos
-- y un juego puede estar en muchas colecciones.
-- ---------------------------------------------------------
CREATE TABLE collection_items (
  collection_id INTEGER     NOT NULL REFERENCES collections(id) ON DELETE CASCADE,
  game_id       INTEGER     NOT NULL REFERENCES games(id),
  added_at      TIMESTAMPTZ NOT NULL DEFAULT now(),

  PRIMARY KEY (collection_id, game_id)
);


-- ---------------------------------------------------------
-- ACTIVITY
-- Registro de todo lo que hace el usuario.
-- game_id puede ser NULL: crear una colección o editar el perfil no es sobre un juego.
-- meta guarda el detalle: {"from":"playing","to":"completed"}, {"rating":9}, etc.
-- ---------------------------------------------------------
CREATE TABLE activity (
  id         BIGSERIAL PRIMARY KEY,
  user_id    INTEGER     NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  game_id    INTEGER     REFERENCES games(id) ON DELETE SET NULL,
  type       VARCHAR(30) NOT NULL CHECK (type IN (
    'library_add', 'library_remove', 'status_change',
    'favorite_add', 'favorite_remove', 'rating_set',
    'review_save', 'review_delete',
    'collection_create', 'collection_delete', 'collection_add', 'collection_remove',
    'profile_update'
  )),
  meta       JSONB       NOT NULL DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);


-- ---------------------------------------------------------
-- ÍNDICES
-- Los UNIQUE (user_id, ...) ya crean un índice que empieza por user_id,
-- así que acá van solo los que faltan.
-- ---------------------------------------------------------
CREATE INDEX idx_library_user_status   ON library_items (user_id, status);
CREATE INDEX idx_activity_user_date    ON activity (user_id, created_at DESC);
CREATE INDEX idx_collection_items_game ON collection_items (game_id);

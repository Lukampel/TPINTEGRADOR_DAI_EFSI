# DB — Nexora (PostgreSQL)
Estado: **migración 001 escrita y runner hecho** (`backend/db/migrate.js`), **aplicada en Neon** (28/10, proyecto de Rami; 9 tablas incluida `schema_migrations`). Migraciones: SQL numerado `NNN_*.sql`; el runner aplica en orden solo las que no están en `schema_migrations`, cada una en su transacción (idempotente). Seed: `npm run seed` (TODO, T22).

## Reglas del modelo
- Contenido de RAWG se guarda como **snapshot compartido** en `games` (clave estable `rawg_id`); lo personal vive en `library_items` etc.
- Una fila `library_items` por (usuario, juego): contiene estado, favorito, puntuación, horas y plataforma. Puntuar, favoritear o reseñar un juego que no está en la biblioteca lo **agrega** con estado `want_to_play` (upsert implícito).
- Reseñas, colecciones y actividad son privadas del usuario (la consigna exige separación total).

## Esquema
Fuente única: `backend/db/migrations/001_init.sql` (unifica el script de Lu y el diseño inicial; probado en Postgres 16). Tablas:
| Tabla | Qué guarda |
|---|---|
| `users` | cuenta + perfil (`display_name`, `avatar_url`, `bio`) |
| `user_preferences` | géneros/plataformas favoritas, una fila por valor (`kind` = `genre`\|`platform`) |
| `games` | snapshot de RAWG (`rawg_id` único) |
| `library_items` | 1 por (usuario, juego): `status`, `is_favorite`, `rating` 1–10, `hours_played`, `platform`, `finished_at` |
| `reviews` | 1 por (usuario, juego) |
| `collections` / `collection_items` | colecciones y sus juegos (N a N) |
| `activity` | historial; `meta` JSONB con el detalle |
Fechas en `TIMESTAMPTZ`. La migración no tiene `DROP TABLE` (no borra datos en producción). El tema claro/oscuro no va a la BD (es preferencia del navegador).
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

# API — Nexora (backend propio)
Estado: **diseño**. Base `/api`. JSON. 🔒 = requiere cookie `nexora_token` válida (si no: 401). Todo lo 🔒 opera solo sobre datos de `req.user.id`.
Errores: ver contrato en `ARCHITECTURE.md`. `:rawgId` = id del juego en RAWG (el back resuelve a `games.id`).

## Auth
| Método y ruta | 🔒 | Body | Respuesta |
|---|---|---|---|
| POST `/auth/register` | no | `{username(3-30), email, password(≥8), confirmPassword}` | 201 `{user}` + cookie · 400 · 409 usuario/email existente |
| POST `/auth/login` | no | `{email, password}` | 200 `{user}` + cookie · 401 |
| POST `/auth/logout` | no | — | 204, borra cookie |
| GET `/auth/me` | 🔒 | — | 200 `{user}` · 401 |

`user` = `{id, username, email, avatarUrl, bio, preferences, createdAt}` (nunca `password_hash`).

## Perfil
| GET `/profile` | 🔒 | — | `{user, counts:{library,favorites,collections,reviews}}` |
|---|---|---|---|
| PATCH `/profile` | 🔒 | parcial: `{username?, bio?, avatarUrl?, preferences?}` | 200 `{user}` · 409 |

## Biblioteca y favoritos
| Método y ruta | 🔒 | Body / query | Respuesta |
|---|---|---|---|
| GET `/library` | 🔒 | `?status=&favorite=true&q=&sort=added\|title\|rating\|hours&order=` | `{items:[{game, status, isFavorite, rating, hoursPlayed, platform, finishedAt, addedAt}]}` |
| GET `/library/:rawgId` | 🔒 | — | item o 404 (para pintar botones en Detalle) |
| PUT `/library/:rawgId` | 🔒 | `{game:{title,coverUrl,released,genres,platforms,metacritic}, status?, isFavorite?, rating?, hoursPlayed?, platform?}` | 200 item (crea o actualiza; upsert del snapshot `games`; registra actividad) |
| DELETE `/library/:rawgId` | 🔒 | — | 204 (no borra reseña ni colecciones: sí quita favorito/estado/puntuación) |
| GET `/favorites` | 🔒 | — | atajo de `/library?favorite=true` |

Reglas: `status ∈ want_to_play|playing|completed|abandoned`; `rating` entero 1–10 o `null`; al pasar a `completed` se setea `finishedAt`; un cambio de estado/favorito/puntuación genera actividad (`status_change`, `favorite_add|remove`, `rating_set`).

## Reseñas (privadas)
| GET `/reviews` | 🔒 | — | `{reviews:[{game, body, createdAt, updatedAt}]}` |
|---|---|---|---|
| GET `/reviews/:rawgId` | 🔒 | — | reseña o 404 |
| PUT `/reviews/:rawgId` | 🔒 | `{game:{…snapshot}, body(1-2000)}` | 200/201 (upsert; agrega a biblioteca si faltaba) |
| DELETE `/reviews/:rawgId` | 🔒 | — | 204 |

## Colecciones
| GET `/collections` | 🔒 | — | `{collections:[{id,name,description,gamesCount,coverUrls[]}]}` |
|---|---|---|---|
| POST `/collections` | 🔒 | `{name(1-60), description?}` | 201 · 409 nombre repetido |
| GET `/collections/:id` | 🔒 | — | `{id,name,description,games:[game…]}` · 404 si no es tuya |
| PATCH `/collections/:id` | 🔒 | `{name?, description?}` | 200 |
| DELETE `/collections/:id` | 🔒 | — | 204 |
| POST `/collections/:id/items` | 🔒 | `{game:{…snapshot}}` | 201 · 409 ya estaba |
| DELETE `/collections/:id/items/:rawgId` | 🔒 | — | 204 |

## Actividad, Home, Estadísticas, Salud
| GET `/activity` | 🔒 | `?limit=20&offset=0` | `{items:[{id,type,game?,meta,createdAt}]}` |
|---|---|---|---|
| GET `/home/summary` | 🔒 | — | `{favorites[], recentActivity[], progress:{completed,total,percent}, collections[]}` |
| GET `/stats` | 🔒 | — | los 8 indicadores de `DB.md` |
| GET `/health` | no | — | `{status:"ok"}` (Render/monitoreo) |

## Notas de validación
Zod en `validators/`. `email` normalizado a minúsculas. Contraseña: bcrypt (cost 10–12). 404 también cuando el recurso existe pero es de otro usuario (no filtrar existencia).

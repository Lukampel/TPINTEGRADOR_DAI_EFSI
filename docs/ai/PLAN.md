# PLAN — Nexora
Hoy: vie 23/10/2026. Congelamiento de features: **vie 20/11**. Entrega nominal: **lun 23/11** (sin confirmar; si hay más tiempo, el margen se usa en QA/tema claro/Wrapped). Reparto **tentativo** (D14): cada persona toca front y back. M=Maxi · L=Lu · R=Rami · T=todos.

## Hitos
| Fecha | Hito |
|---|---|
| 25/10 | Trello y Figma completos; repo con ramas por persona |
| 4/11 | Esqueleto **desplegado** (login real en producción) |
| 13/11 | Funcionalidad completa en rama principal (biblioteca, colecciones, reseñas, actividad) |
| 20/11 | Feature freeze + seed demo + responsive |
| 23/11 | Entrega: README humano, QA en producción, defensa lista |

## Tarjetas de Trello (T01–T27)
| ID | Módulo | Tarea | Resp. | Inicio | Fin |
|---|---|---|---|---|---|
| T01 | DOCS | Documentación para IA y consigna condensada | M | 23/10 | 24/10 |
| T02 | ORG | Trello: columnas, miembros, labels, tarjetas, link en README | M | 23/10 | 25/10 |
| T03 | DISEÑO | Completar Figma: 9 pantallas × (normal/cargando/vacío/error) + tokens | T | 23/10 | 1/11 |
| T04 | BD | Crear BD en Neon + `.env` + migración 001 + runner | R | 26/10 | 27/10 |
| T05 | BACK | Scaffold Express: config, pg pool, `/health`, errorHandler, CORS | R | 26/10 | 28/10 |
| T06 | FRONT | Scaffold Vite: Router, Axios (`withCredentials`), tokens.css, layout | L | 26/10 | 28/10 |
| T07 | AUTH | Back: register/login/logout/me, bcrypt, JWT cookie, middleware, Zod | M | 27/10 | 31/10 |
| T18 | ACTIVIDAD | Back: helper `logActivity` (transaccional) + `GET /activity` | R | 28/10 | 30/10 |
| T10 | EXPLORAR | Servicio RAWG + pantalla Explorar (texto + género/orden) | L | 29/10 | 4/11 |
| T08 | AUTH | Front: AuthContext, Login, Registro, PrivateRoute, `/me` al iniciar, interceptor 401 | M | 30/10 | 3/11 |
| T09 | DEPLOY | Vercel + Render + Neon, rewrite `/api`, env vars, migrar en deploy | R | 31/10 | 4/11 |
| T12 | BIBLIOTECA | Back: `/library` CRUD, upsert `games`, filtros, favoritos | L | 2/11 | 6/11 |
| T11 | DETALLE | Pantalla Detalle (RAWG + acciones guardar/puntuar/favorito) | M | 4/11 | 8/11 |
| T14 | COLECCIONES | Back: `/collections` + items | R | 5/11 | 9/11 |
| T13 | BIBLIOTECA | Front: Biblioteca (lista, filtros, estado, favorito, puntuación) | L | 5/11 | 10/11 |
| T16 | RESEÑAS | Back+front: reseñas y puntuaciones (form, lista, editar/borrar) | M | 9/11 | 13/11 |
| T15 | COLECCIONES | Front: lista, crear/borrar, detalle, agregar/quitar juegos | R | 9/11 | 13/11 |
| T17 | PERFIL | Back+front: perfil, avatar, bio, preferencias, favoritos, actividad | L | 11/11 | 14/11 |
| T21 | HOME | Back `/home/summary` + front Home (destacados + resumen) | R | 12/11 | 17/11 |
| T19 | STATS | Back: `/stats` con 8 consultas SQL | M | 13/11 | 17/11 |
| T20 | STATS | Front: Estadísticas con tarjetas y gráficos | M | 16/11 | 19/11 |
| T22 | SEED | Seed reproducible de la cuenta demo (requisitos R15) | L | 14/11 | 18/11 |
| T23 | UX | Estados cargando/error/vacío/token vencido + responsive + fidelidad Figma | T | 16/11 | 20/11 |
| T24 | QA | Recorrido completo en producción (crear cuenta→…→re-login) | T | 18/11 | 21/11 |
| T25 | README | README escrito por humanos (secciones en `CONSIGNA.md` R23) | T | 16/11 | 21/11 |
| T26 | DEFENSA | Cada uno ensaya explicar su módulo y el flujo end-to-end | T | 20/11 | 23/11 |
| T27 | EXTRA | (Opcional, post-freeze) tema claro; luego "Nexora Wrapped" | T | 21/11 | — |

## Convenciones de Trello (consigna R20)
- Columnas: **Pendiente · En desarrollo · En revisión · Finalizada**. Labels = módulo.
- Cada tarjeta: título `[MÓDULO] verbo + objeto`, descripción (qué y criterio de "listo"), responsable(s), fecha inicio y fin (al cerrar, **fechas reales**), checklist.
- Mover a *En revisión* al abrir el PR (link en la tarjeta); a *Finalizada* al mergear, con resumen de 1–2 líneas + link al PR/commit.
- Tarjetas conjuntas (T) con todos como miembros y subchecklist por persona. Actualizar a medida que se avanza; nunca todo al final.

## Flujo de PR
Rama `feature/nombre-apellido` → commits chicos → PR a `main` con "qué cambia / cómo probar / tarjeta Trello" → revisa otra persona → merge. Revisor rota: M→L→R→M.

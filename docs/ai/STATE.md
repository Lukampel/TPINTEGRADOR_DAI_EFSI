# STATE — Nexora
Actualizado: 2026-10-28 · Sesión con: Rami · Fase: **scaffold / arranque del código**

## Hecho
- Docs base (consigna, arquitectura, BD, API, plan, decisiones) y reglas de Git/IA con hooks.
- `main`: esqueleto del front (rutas, layout, servicios, búsqueda en Explorar) mergeado desde `feature/luciana-kampel` (PR #1).
- `feature/ramiro-pita` (28/10, PR a `main` pendiente de revisión de Maxi):
  - **T05** scaffold Express: `app.js`/`server.js`, `config/env.js`, pool de `pg` (`query`, `withTransaction`), `errorHandler` + `AppError`, CORS con credenciales, `GET /api/health` (chequea la BD).
  - **T04** runner `npm run migrate` (`schema_migrations`, una transacción por archivo, idempotente). BD creada en Neon (proyecto de Rami) con `001_init.sql` aplicada: 9 tablas. `/health` → 200 contra Neon.

## Pendiente (bloqueantes primero)
1. **Revisar y mergear el PR de Rami** (revisor: Maxi). Hasta entonces, el back no está en `main`.
2. **Compartir el acceso a Neon** con el equipo (invitar a Maxi y Lu al proyecto, o pasar la `DATABASE_URL` por un canal privado, nunca por el repo). Lo necesita Maxi para T07 (auth).
3. **Trello de Nexora**: falta que Maxi acepte la invitación; después, cargar las tarjetas de `PLAN.md` y mover T04/T05 a *En revisión*.
4. **Figma**: faltan pantallas, tipografía y componentes (T03).
5. **Confirmar con Lu y Rami** las decisiones D03–D07, D10, D17 y D18 de `DECISIONS.md` y el reparto de `PLAN.md`. Rami todavía no las revisó (aceptó, por ahora, la convención de ramas `feature/nombre-apellido`).
6. **Fecha real de entrega y defensa** (se asume ~23/11) y validar Neon con el docente.
7. Key de RAWG (`VITE_RAWG_KEY`).
8. Lu: correr `sh scripts/setup-hooks.sh` y configurar su `user.name`/`user.email` si no lo hizo.

## Última sesión por persona
- Maxi (23/10): docs base, Figma leído, reglas de docs y Git (`RULES.md`, hooks). Trello sin acceso aún.
- Lu: esqueleto del front + búsqueda en Explorar (PR #1 mergeado).
- Rami (28/10): T04 + T05 hechos y probados contra Neon; hooks e identidad de git configurados en su clon.

## Próximo paso
- Rami: **T18** (`logActivity` transaccional con `withTransaction` + `GET /activity`, depende del middleware de auth de T07) y después **T09** (deploy Render + Vercel + Neon, hito 4/11).
- Maxi: **T07** (auth back) sobre el scaffold de T05, una vez mergeado.

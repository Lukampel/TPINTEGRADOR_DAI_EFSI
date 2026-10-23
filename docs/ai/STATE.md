# STATE — Nexora
Actualizado: 2026-10-23 · Sesión con: Maxi · Fase: **documentación / arranque**

## Hecho
- Consigna condensada (`CONSIGNA.md`), arquitectura, BD, API, plan y decisiones iniciales escritas.
- Perfil de Maxi armado (observado). Perfiles de Lu y Rami: base vacía, falta mini-entrevista.
- Repo: local en `main`, **sin commits**; remoto `github.com/Lukampel/TPINTEGRADOR_DAI_EFSI` (vacío al 23/10).

## Pendiente (bloqueantes primero)
1. **Trello de Nexora** (`tp-integrador`, link de invitación recibido 23/10): el conector de Maxi **todavía no lo ve** porque falta aceptar la invitación. Maxi debe abrir el link e unirse; después se lee el tablero y se cargan las tarjetas de `PLAN.md`.
2. **Figma** (leído 23/10, `DESIGN.md` actualizado): tiene paleta (11 colores) y splash con logo; **faltan todas las pantallas, tipografía y componentes**. Hay que diseñarlas (T03) antes de maquetar cada vista.
3. **Confirmar con Lu y Rami** las decisiones D03–D07, D10, D17 de `DECISIONS.md` (las tomó Maxi solo) y el reparto tentativo de `PLAN.md`.
4. **Fecha real de entrega y defensa**: hoy se asume ~23/11 (dudoso). Preguntar al docente.
5. Consultar al docente por escrito si Postgres alojado en Neon cumple la consigna (esperado que sí).
6. Configurar identidad de git (`user.name` / `user.email` están vacíos en esta máquina).
7. Sacar la key de RAWG (rawg.io/apidocs) y crear la BD en Neon.

8. D18 decidida por Maxi (versionar `CLAUDE.md` y `docs/ai/`): falta que Lu y Rami la confirmen. Primer commit sugerido: `docs:` en una rama propia, con el mensaje revisado por Maxi.
9. Lu y Rami: correr `sh scripts/setup-hooks.sh` en su clon y configurar su `user.name`/`user.email`.

## Última sesión por persona
- Maxi (23/10): docs base, Figma leído, reglas de docs y Git (`RULES.md`, hooks). Trello sin acceso aún.
- Lu: —
- Rami: —

## Lo que Lu y Rami todavía NO saben (briefing en su primera sesión)
Nombre/logo ya definidos; decisiones del 23/10 (Neon en vez de Supabase, cookie HttpOnly, RAWG, Vite+CSS Modules, tema oscuro primero); estructura de docs para IA y su flujo; reglas de IA de la consigna; plan por semanas y reparto tentativo.

## Próximo paso
Con Trello y Figma a mano: crear columnas + tarjetas T01–T26 de `PLAN.md`, llenar `DESIGN.md`, y arrancar T04–T06 (BD, scaffold back y front) el 26/10.

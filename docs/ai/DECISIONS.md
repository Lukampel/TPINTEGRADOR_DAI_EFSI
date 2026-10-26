# DECISIONS — Nexora
Una línea por decisión. "Conf." = quién la confirmó. Cambiar una decisión: nueva fila, marcar la vieja como reemplazada.

| ID | Fecha | Decisión | Por qué | Conf. |
|---|---|---|---|---|
| D01 | 10/2026 | Temática videojuegos; nombre **Nexora** | Elección del grupo | grupo |
| D02 | 23/10 | Estados: Quiero jugar · Jugando · Terminado · Abandonado (sin "Pausado" por ahora) | Los de la consigna | Maxi |
| D03 | 23/10 | PostgreSQL puro en **Neon** (no Supabase) | La consigna prohíbe servicios que reemplacen el backend; Supabase es zona gris. Neon gratis y sin vencer (el Postgres gratis de Render vence a los 30 días: verificar) | Maxi; **pendiente Lu/Rami** |
| D04 | 23/10 | JWT en **cookie HttpOnly**; en prod proxy `/api` vía rewrite de Vercel | Recomendado por la consigna; evita cookies de terceros | Maxi; pendiente Lu/Rami |
| D05 | 23/10 | API externa **RAWG**, consultada desde el front | Key gratis, trae géneros/plataformas/portadas; más simple que IGDB (OAuth Twitch) | Maxi; pendiente Lu/Rami |
| D06 | 23/10 | Front: Vite + JS + CSS Modules + Router + Axios + Context | Alineado a la consigna; sin TypeScript para no sumar curva | Maxi; pendiente Lu/Rami |
| D07 | 23/10 | Back: Express + `pg` sin ORM + Zod + bcrypt; migraciones SQL numeradas | Se defiende mejor el SQL a mano; la consigna pide scripts SQL | Maxi (default de la IA); pendiente Lu/Rami |
| D08 | 23/10 | Monorepo `/frontend` `/backend` `/docs` | Un solo repo, PRs y Trello más simples | default |
| D09 | 23/10 | Deploy: Vercel (front) + Render (back) + Neon (BD) | Gratis; Maxi ya tiene Vercel conectado | default; pendiente Lu/Rami |
| D10 | 23/10 | Tema oscuro primero, claro después; paleta desde Figma | Pedido de Maxi | Maxi |
| D11 | 23/10 | Snapshot de juegos de RAWG en tabla `games`; puntuación 1–10 en `library_items`; 1 reseña por usuario y juego; reseñas privadas | Reconstruir vistas sin llamar a RAWG; separación de datos exigida | default |
| D12 | 23/10 | Estadísticas: 8 indicadores (ver `DB.md`); "Nexora Wrapped" anual queda para después | Maxi: "por ahora no" | Maxi |
| D13 | 23/10 | Horas jugadas cargadas a mano; datos demo simulados (sin importar Steam) | Alcance | default |
| D14 | 23/10 | Roles fluidos ("todos hacemos todo"); reparto tentativo en `PLAN.md` | Pedido de Maxi; cada persona toca front y back | Maxi; pendiente Lu/Rami |
| D15 | 23/10 | Fecha objetivo: congelar features 20/11, entrega nominal ~23/11 (a confirmar con docente) | "Un mes, dudoso" | pendiente |
| D16 | 23/10 | Docs de IA en español, compactos; README solo humano | Consigna R21 + ahorro de tokens | Maxi |
| D17 | 23/10 | Git: `feature/nombre-apellido`, PR a `main`, commits en español con prefijo, sin atribución a IA | Consigna R19/R21 | default |
| D18 | 23/10 | `CLAUDE.md` y `docs/ai/` **se versionan** en el repo entregado (transparencia: la IA es herramienta de apoyo, no coautora). Como los pueden leer los docentes: contenido profesional, sin secretos ni juicios personales | Decisión de Maxi; la consigna veta atribución/coautoría, no el uso como herramienta | Maxi; pendiente Lu/Rami |
| D19 | 23/10 | Regla #1 técnica: hooks versionados `.githooks/` (commit-msg, pre-push) + `.claude/settings.json` sin atribución; activar con `sh scripts/setup-hooks.sh`; reglas de docs en `RULES.md` | Evitar que un commit con rastro de IA llegue al remoto | Maxi |
| D20 | 23/10 | Esquema único en `001_init.sql`: nombres en inglés (alineados con `API.md`), preferencias en tabla `user_preferences` (no JSONB), `display_name`, sin `DROP TABLE` | Unir el script de Lu con `DB.md`; la tabla de preferencias es más fácil de consultar y defender | Lu; pendiente Maxi/Rami |

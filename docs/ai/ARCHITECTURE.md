# ARCHITECTURE — Nexora
Estado: **diseño** (código aún no existe). Si el código difiere, actualizar este archivo.

## Mapa
```
Navegador ──(/api/*, cookie)──► Vercel (React) ──rewrite──► Render (Express) ──pg──► Neon (Postgres)
     └──────(Axios directo, key pública)──────────────────► RAWG API
```
Los datos personales van SIEMPRE por nuestro backend. RAWG se consulta directo desde el front (`services/rawg.js`) para explorar/detalle.

## Estructura de carpetas
```
/frontend/src   components/ (reutilizables) · pages/ · context/ · services/ · hooks/ · utils/ · styles/ (tokens.css) · App.jsx · main.jsx
/backend        src/{config,db,middleware,routes,controllers,models,validators,utils} · db/migrations/NNN_*.sql · db/seeds/
/docs/ai        documentación para IA (este directorio)
```
Backend en capas: `routes` (URL→controller) → `controllers` (HTTP, valida con Zod) → `models` (SQL con `pg`). Sin lógica SQL en controllers.

## Rutas del front
Públicas: `/login`, `/register`. Privadas (`<PrivateRoute>`): `/` Home · `/explore` · `/game/:rawgId` · `/library` · `/collections` · `/collections/:id` · `/profile` · `/stats`. Cualquier otra → 404.

## Autenticación (decisión D04)
1. `POST /api/auth/login` valida credenciales (bcrypt) y responde con `Set-Cookie: nexora_token=<JWT>; HttpOnly; Secure(prod); SameSite=Lax; Path=/; Max-Age=7d`.
2. El JWT lleva `{ sub: userId }` y vence a los 7 días (`JWT_EXPIRES_IN`). El servidor lo verifica en **cada** request privada (`middleware/auth.js` → `req.user = { id }`).
3. Al arrancar, `AuthContext` llama `GET /api/auth/me`: 200 → sesión activa; 401 → anónimo. Mientras tanto `loading=true` (no redirigir antes de saber).
4. Interceptor de Axios: ante 401 en ruta privada → limpiar `user` en el contexto y navegar a `/login` con mensaje "Tu sesión venció".
5. `POST /api/auth/logout` borra la cookie. El front usa `withCredentials: true`.
6. **Same-site en producción:** `vercel.json` reescribe `/api/*` hacia la URL de Render, así el navegador ve un único dominio y la cookie es first-party. En dev, proxy de Vite `/api → http://localhost:4000`. Si no se pudiera, plan B: `SameSite=None; Secure` + CORS con credenciales (riesgo: bloqueo de cookies de terceros).

## Estado en React
- `AuthContext`: `user`, `loading`, `login()`, `register()`, `logout()`. (Obligatorio, con propósito real.)
- Opcional: `LibraryContext` para cache de la biblioteca (ids/estados) y evitar refetch. Nunca persistir en localStorage.
- `localStorage` solo para preferencias de UI (p. ej. tema), nunca datos de negocio.
- Componentes estándar de estado: `<Loader/>`, `<ErrorMessage onRetry/>`, `<EmptyState/>`. Toda pantalla con datos maneja los 3 + token vencido.

## Contrato de errores (backend)
`{ "error": { "code": "VALIDATION_ERROR", "message": "Texto para humanos", "details": [{ "field": "email", "message": "…" }] } }`
Códigos HTTP: 400 validación · 401 sin/ inválido/ vencido token o credenciales malas · 403 prohibido · 404 no existe **o no es tuyo** · 409 duplicado · 500 inesperado (sin detalles internos). Handler global de errores en `middleware/errorHandler.js`.

## Variables de entorno (solo nombres)
Back: `PORT`, `NODE_ENV`, `DATABASE_URL`, `JWT_SECRET`, `JWT_EXPIRES_IN`, `CORS_ORIGIN`. Front: `VITE_API_URL` (default `/api`), `VITE_RAWG_KEY`. Cada carpeta tiene `.env.example` sin valores; `.env` en `.gitignore`.

## RAWG
Base `https://api.rawg.io/api`. Usamos `/games?search=&genres=&ordering=&page_size=`, `/games/{id}`, `/genres`. La key viaja en el front (es de uso cliente); verificar términos de RAWG y **mostrar crédito/enlace a RAWG** en la app. El front manda al back un snapshot mínimo del juego (ver `DB.md`, tabla `games`).

## Deploy
Neon (BD) → Render Web Service (`backend`, build `npm i`, start `npm start`, env vars, correr `npm run migrate` en el deploy) → Vercel (`frontend`, Vite, `vercel.json` con rewrite). Nota: el plan gratis de Render duerme el servicio (primer request lento): avisarlo en la defensa/probar antes. Desplegar el esqueleto **temprano** (T09), no al final.

# CONSIGNA condensada (reemplaza leer el PDF)
Videojuegos. IDs `R..` para citar en tarjetas/PRs. ✅ al cumplir.

## Frontend
- R1 Registro (usuario, email, password, confirmación) con validación y errores claros.
- R2 Login contra backend (JWT). Sesión persiste al recargar mientras el token valga; al arrancar se consulta `/me`.
- R3 Logout borra auth local y bloquea rutas privadas. Login/registro públicos; resto protegido.
- R4 Datos separados por cuenta (nadie ve/modifica lo de otro).
- R5 Vistas: **Home** (destacados API + resumen personal: favoritos, actividad, progreso, colecciones) · **Explorar** (búsqueda por texto en API + ≥1 filtro/orden) · **Detalle** (portada, título, descripción, categorías, metadatos; guardar/puntuar/reseñar) · **Biblioteca** (alta/baja, estados, favoritos, puntuación, reseñas, filtros) · **Colecciones** (crear/nombrar/borrar, agregar/quitar juegos, detalle) · **Perfil** (avatar, nombre, bio, preferencias, favoritos, actividad, editar ≥1 dato) · **Estadísticas**.
- R6 Estados: Quiero jugar · Jugando · Terminado · Abandonado.
- R7 **≥6 estadísticas** calculadas al momento con datos reales, cambian al modificar datos. Nada hardcodeado. (Ideas: terminados, géneros favoritos, plataformas, promedio, horas, avance.)
- R8 Actividad registrada (agregar, cambiar estado, favorito, puntuar, colecciones, reseñas) y persistida.

## Backend (Node + Express + PostgreSQL propio; **no Supabase**)
- R9 Endpoints registro/login/me. Hash seguro (nunca texto plano). JWT con expiración y control de acceso. Middleware de auth.
- R10 CRUD según corresponda: perfil, biblioteca, favoritos, colecciones, puntuaciones, reseñas. Todo asociado al usuario autenticado; **autorización en el servidor**.
- R11 Validación de entrada + errores coherentes con códigos HTTP correctos.
- R12 Conexión por variables de entorno; sin secretos en el repo.
- R13 Modelo relacional: usuarios, biblioteca, colecciones, colección↔contenido, reseñas, puntuaciones, actividad. Contenido externo vinculado por ID estable, guardando lo necesario para reconstruir vistas.
- R14 Documentar esquema y endpoints (método, ruta, auth, body, respuesta). Scripts SQL/migraciones + carga reproducible de demo.

## Cuenta demo (con historia, nada vacío)
- R15 Perfil con avatar, bio, preferencias · ≥10 juegos en biblioteca · ≥5 favoritos · ≥3 colecciones · ≥3 estados distintos · ≥5 puntuaciones · ≥3 reseñas · actividad reciente · preferencias/categorías. Credenciales por canal del docente, **nunca en repo público**.

## Integración / estado
- R16 Axios; llamadas HTTP en módulos `services/` separados de la UI. Estados de carga, error de conexión, respuesta vacía y token vencido.
- R17 Context API con propósito real (auth/usuario activo). localStorage solo de apoyo (nunca datos de negocio).
- R18 Sesión mientras el JWT valga o hasta logout. Cookie HttpOnly+Secure+SameSite recomendada. Expiración validada siempre en servidor.

## Colaboración
- R19 GitHub compartido, **una rama por integrante** (`feature/nombre-apellido`), PRs con descripción, commits frecuentes y específicos, aportes técnicos de todos.
- R20 **Trello**: tarjeta por tarea (título+descripción), responsables, fechas inicio/fin (reales en las terminadas), columnas Pendiente / En desarrollo / En revisión / Finalizada, actualizado durante todo el TP (no cargar al final), evidencia (resumen + link a commit/PR), se ve el aporte de cada uno, **link en el README**, docentes con acceso.
- R21 **IA**: README escrito por los integrantes (no IA). No proyectos generados por IA. Claude/IA **no** figura como colaborador/coautor. Se verifica con Git, estructura, decisiones y defensa oral.

## Deploy y entregables
- R22 URL pública del front en React; back desplegado; Postgres accesible en producción (no la PC de nadie). CORS/env/rutas de prod configurados. Flujo completo funcionando: crear cuenta → login → usar → guardar → logout → volver a ver datos.
- R23 Entregables: URL del front · repo(s) GitHub con evidencia de equipo · **README** (integrantes y responsabilidades, temática, arquitectura, instalación local, variables sin valores, comandos, API externa, endpoints, modelo de datos, estrategia de auth, links de deploy) · credenciales demo (canal docente) · doc básica del backend + evidencia de integración front-back.

## Evaluación (para priorizar)
Funcionalidad desplegada · backend propio (REST, validación, autorización, errores, Postgres) · auth/JWT/rutas/separación de datos · integración React+API externa+backend · Context/estado/componentes reutilizables · consistencia de biblioteca/colecciones/reseñas/stats · calidad visual, responsive y **fidelidad al Figma** · orden del código · colaboración real y reglas de IA · **defensa individual**.

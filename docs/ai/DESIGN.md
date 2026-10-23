# DESIGN — Nexora
Figma: `https://www.figma.com/design/BXpCZrRI4XQPz3KU9WdoYl/Nexora` (fileKey `BXpCZrRI4XQPz3KU9WdoYl`, página `0:1`). Fidelidad al Figma se evalúa.
Estado (leído el 23/10): el Figma tiene **solo** el frame `Home` (1:3, 1920×1080: splash con el logo sobre degradé violeta→oscuro) y la **paleta** (1:6, 11 variables). **No hay pantallas, tipografías ni componentes** → T03 es trabajo grande. Los valores marcados *(propuesto)* NO están en Figma: confirmarlos o definirlos allí.
Logo: libro abierto con joystick, violeta/lavanda (`Nexora_icon`, nodo 3:71).

## Principios
- Tema **oscuro primero**; claro después (T27, opcional). Paleta ya definida en Figma.
- Todos los colores/espaciados/tipografías salen de variables CSS en `frontend/src/styles/tokens.css`; ningún valor suelto en componentes. El tema claro se agrega con `[data-theme="light"]` sin tocar componentes.
- CSS Modules por componente (`Componente.module.css`). Mobile-first; breakpoints `640 / 1024`.

## Tokens (tema oscuro; nombres CSS fijos)
| Token | Valor | Variable en Figma |
|---|---|---|
| `--nx-bg` | `#0D0F14` | Obsidian Black |
| `--nx-surface` | `#1B1C29` | Deep Graphite |
| `--nx-text` | `#EDEBFF` | Texto Principal |
| `--nx-text-muted` | `#9B9BB5` | Texto Secundario |
| `--nx-text-disabled` | `#4B4F66` | Texto Desactivado |
| `--nx-primary` | `#8B5CF6` | Electric Violet |
| `--nx-primary-soft` | `#A78BFA` | Soft Lavender (hover/realces) |
| `--nx-info` | `#3B82F6` | Digital Blue |
| `--nx-success` | `#22C55E` | Success |
| `--nx-warning` | `#F59E0B` | Warning |
| `--nx-danger` | `#EF4444` | Error |
| `--nx-surface-2`, `--nx-border` | *(propuesto)* un paso más claro que surface; borde = `#4B4F66` con ~40 % de opacidad | no existe |
| `--nx-radius-{sm,md,lg}`, `--nx-space-{1..8}` | *(propuesto)* 6/10/16 px · escala de 4 px | no existe |
| Tipografía | *(propuesto)* Inter (sans) con escala 12/14/16/20/24/32 | no existe |

Color por estado de juego *(propuesto, usa solo la paleta)*: want_to_play `info` · playing `primary-soft` · completed `success` · abandoned `danger`. Estrellas/puntuación y avisos: `warning`.
Fondo de splash/login sugerido: degradé `primary` → `bg`, como el frame Home.

## Pantallas (todas deben existir en Figma)
Login · Registro · Home · Explorar · Detalle · Biblioteca · Colecciones (lista + detalle) · Perfil · Estadísticas. Para cada una: estado normal, cargando, vacío, error. Estado en Figma al 23/10: **ninguna dibujada** (solo splash con logo).

## Componentes reutilizables previstos
`Navbar`, `GameCard`, `GameGrid`, `StatusBadge`, `StatusSelect`, `RatingInput`, `FavoriteButton`, `ReviewForm`, `CollectionCard`, `CollectionPicker` (modal), `StatCard`, `BarChart/DonutChart` (SVG propio o librería liviana), `Loader`, `ErrorMessage`, `EmptyState`, `FormField`, `PrivateRoute`.

## Estadísticas: visualización sugerida
Tarjetas numéricas (1, 5, 6), dona (2), barras horizontales (3, 4, 8), histograma (5), línea/barras por mes (7). Decidir librería (p. ej. Recharts) en `DECISIONS.md` antes de instalar.

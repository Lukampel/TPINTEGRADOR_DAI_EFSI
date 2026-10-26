import { NavLink, Outlet } from 'react-router-dom'
import styles from './Layout.module.css'

const links = [
  { to: '/', label: 'Inicio' },
  { to: '/explore', label: 'Explorar' },
  { to: '/library', label: 'Biblioteca' },
  { to: '/collections', label: 'Colecciones' },
  { to: '/stats', label: 'Estadísticas' },
  { to: '/profile', label: 'Perfil' },
]

// Marco común de las pantallas privadas: barra de navegación arriba,
// la pantalla actual en el medio (<Outlet />) y el crédito a RAWG abajo.
function Layout() {
  return (
    <div className={styles.layout}>
      <header className={styles.header}>
        <span className={styles.logo}>Nexora</span>
        <nav className={styles.nav}>
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              className={({ isActive }) => (isActive ? `${styles.link} ${styles.active}` : styles.link)}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
      </header>

      <main className={styles.main}>
        <Outlet />
      </main>

      <footer className={styles.footer}>
        Datos de juegos provistos por <a href="https://rawg.io" target="_blank" rel="noreferrer">RAWG</a>
      </footer>
    </div>
  )
}

export default Layout

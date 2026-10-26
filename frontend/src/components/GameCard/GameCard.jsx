import { Link } from 'react-router-dom'
import styles from './GameCard.module.css'

// Tarjeta de un juego de RAWG: portada, título, año y géneros. Lleva al detalle.
function GameCard({ game }) {
  const year = game.released ? game.released.slice(0, 4) : 'Sin fecha'
  const genres = game.genres.map((genre) => genre.name).join(', ')

  return (
    <Link to={`/game/${game.id}`} className={styles.card}>
      {game.background_image ? (
        <img className={styles.cover} src={game.background_image} alt={game.name} loading="lazy" />
      ) : (
        <div className={styles.cover} />
      )}
      <div className={styles.info}>
        <h3 className={styles.title}>{game.name}</h3>
        <p className={styles.meta}>
          {year}
          {genres && ` · ${genres}`}
        </p>
      </div>
    </Link>
  )
}

export default GameCard

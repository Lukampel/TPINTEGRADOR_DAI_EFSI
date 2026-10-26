import { useCallback, useEffect, useState } from 'react'
import GameCard from '../components/GameCard/GameCard'
import { EmptyState, ErrorMessage, Loader } from '../components/StateMessage/StateMessage'
import useDebounce from '../hooks/useDebounce'
import { getGenres, searchGames } from '../services/rawg'
import styles from './Explore.module.css'

const orderings = [
  { value: '', label: 'Relevancia' },
  { value: '-rating', label: 'Mejor puntuados' },
  { value: '-released', label: 'Más nuevos' },
  { value: 'name', label: 'Nombre (A-Z)' },
]

function Explore() {
  const [search, setSearch] = useState('')
  const [genre, setGenre] = useState('')
  const [ordering, setOrdering] = useState('')
  const [genres, setGenres] = useState([])
  const [games, setGames] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [retry, setRetry] = useState(0)

  const debouncedSearch = useDebounce(search.trim())

  // La lista de géneros se pide una sola vez, para el selector.
  useEffect(() => {
    getGenres()
      .then(setGenres)
      .catch(() => setGenres([]))
  }, [])

  // Cada vez que cambia un filtro se vuelve a buscar.
  // Si llega una búsqueda nueva antes de que termine la anterior, la anterior se cancela.
  useEffect(() => {
    const controller = new AbortController()
    setLoading(true)
    setError(false)

    searchGames({ search: debouncedSearch, genre, ordering, signal: controller.signal })
      .then(setGames)
      .catch((err) => {
        if (err.name !== 'CanceledError') setError(true)
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false)
      })

    return () => controller.abort()
  }, [debouncedSearch, genre, ordering, retry])

  const handleRetry = useCallback(() => setRetry((n) => n + 1), [])

  return (
    <section>
      <h1>Explorar</h1>

      <div className={styles.filters}>
        <input
          className={styles.search}
          type="search"
          placeholder="Buscar juegos…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select className={styles.select} value={genre} onChange={(e) => setGenre(e.target.value)}>
          <option value="">Todos los géneros</option>
          {genres.map((g) => (
            <option key={g.id} value={g.slug}>
              {g.name}
            </option>
          ))}
        </select>
        <select className={styles.select} value={ordering} onChange={(e) => setOrdering(e.target.value)}>
          {orderings.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      </div>

      {loading && <Loader />}
      {!loading && error && <ErrorMessage message="No pudimos cargar los juegos." onRetry={handleRetry} />}
      {!loading && !error && games.length === 0 && <EmptyState message="No encontramos juegos con esa búsqueda." />}
      {!loading && !error && games.length > 0 && (
        <div className={styles.grid}>
          {games.map((game) => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>
      )}
    </section>
  )
}

export default Explore

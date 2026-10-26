import axios from 'axios'

// Cliente para la API externa RAWG. La key va como parámetro en cada pedido.
const rawg = axios.create({
  baseURL: 'https://api.rawg.io/api',
  params: { key: import.meta.env.VITE_RAWG_KEY },
})

// Busca juegos. Todos los filtros son opcionales; los vacíos no se mandan.
export async function searchGames({ search, genre, ordering, signal }) {
  const params = { page_size: 20 }
  if (search) params.search = search
  if (genre) params.genres = genre
  if (ordering) params.ordering = ordering

  const { data } = await rawg.get('/games', { params, signal })
  return data.results
}

export async function getGenres() {
  const { data } = await rawg.get('/genres')
  return data.results
}

export async function getGame(rawgId) {
  const { data } = await rawg.get(`/games/${rawgId}`)
  return data
}

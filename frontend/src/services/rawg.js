import axios from 'axios'

// Cliente para la API externa RAWG. La key va como parámetro en cada pedido.
const rawg = axios.create({
  baseURL: 'https://api.rawg.io/api',
  params: { key: import.meta.env.VITE_RAWG_KEY },
})

export default rawg

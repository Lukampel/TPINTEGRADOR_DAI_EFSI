import axios from 'axios'

// Cliente para NUESTRO backend. withCredentials hace que el navegador
// mande la cookie de sesión (nexora_token) en cada pedido.
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  withCredentials: true,
})

export default api

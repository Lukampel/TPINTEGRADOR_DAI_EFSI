import cookieParser from 'cookie-parser'
import cors from 'cors'
import express from 'express'
import { env } from './config/env.js'
import { errorHandler, notFound } from './middleware/errorHandler.js'
import healthRoutes from './routes/health.routes.js'

// app.js arma la aplicación; server.js la pone a escuchar.
// Separarlos permite probar la app sin abrir un puerto.
const app = express()

// credentials: true deja que el navegador mande la cookie nexora_token.
// En producción el front llama por el rewrite de Vercel (mismo dominio),
// así que CORS importa sobre todo en desarrollo.
app.use(cors({ origin: env.corsOrigin, credentials: true }))
app.use(express.json())
app.use(cookieParser())

app.use('/api/health', healthRoutes)
// Acá se montan las demás rutas: /api/auth, /api/library, /api/collections, ...

app.use(notFound)
app.use(errorHandler)

export default app

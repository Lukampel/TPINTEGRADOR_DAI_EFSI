import { Router } from 'express'
import { query } from '../db/pool.js'

const router = Router()

// GET /api/health → confirma que el server está vivo y que llega a la BD.
// Sirve para probar el deploy y para que Render chequee el servicio.
router.get('/', async (req, res) => {
  try {
    await query('SELECT 1')
    res.json({ status: 'ok', db: 'ok' })
  } catch {
    res.status(503).json({ status: 'error', db: 'unreachable' })
  }
})

export default router

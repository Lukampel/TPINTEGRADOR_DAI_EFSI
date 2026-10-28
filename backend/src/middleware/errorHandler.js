import { env } from '../config/env.js'
import { AppError } from '../utils/AppError.js'

// Cualquier ruta que no matcheó llega acá.
export function notFound(req, res, next) {
  next(new AppError(404, 'NOT_FOUND', `No existe ${req.method} ${req.originalUrl}`))
}

// Handler global: toda respuesta de error sale con el mismo formato
// { error: { code, message, details? } }. Express 5 manda acá también
// los errores de funciones async, sin try/catch en cada controller.
// eslint-disable-next-line no-unused-vars
export function errorHandler(err, req, res, next) {
  if (err instanceof AppError) {
    return res.status(err.status).json({
      error: { code: err.code, message: err.message, ...(err.details && { details: err.details }) },
    })
  }

  // JSON mal formado en el body
  if (err.type === 'entity.parse.failed') {
    return res.status(400).json({ error: { code: 'INVALID_JSON', message: 'El cuerpo no es un JSON válido' } })
  }

  // Inesperado: se loguea entero en el servidor, pero al cliente no se le filtran detalles internos.
  console.error(err)
  res.status(500).json({
    error: { code: 'INTERNAL_ERROR', message: 'Ocurrió un error inesperado', ...(!env.isProd && { debug: err.message }) },
  })
}

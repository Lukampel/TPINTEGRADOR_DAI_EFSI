// Error "esperado" con su código HTTP y código del contrato de errores (ARCHITECTURE.md).
// Uso: throw new AppError(404, 'NOT_FOUND', 'La colección no existe')
export class AppError extends Error {
  constructor(status, code, message, details) {
    super(message)
    this.status = status
    this.code = code
    this.details = details
  }
}

import 'dotenv/config'

// Lee las variables de entorno una sola vez y falla al arrancar si falta algo
// obligatorio (mejor un error claro ahora que uno raro en el primer request).
function required(name) {
  const value = process.env[name]
  if (!value) throw new Error(`Falta la variable de entorno ${name} (ver backend/.env.example)`)
  return value
}

export const env = {
  port: Number(process.env.PORT) || 4000,
  nodeEnv: process.env.NODE_ENV || 'development',
  isProd: process.env.NODE_ENV === 'production',
  databaseUrl: required('DATABASE_URL'),
  jwtSecret: process.env.JWT_SECRET || '',
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '7d',
  corsOrigin: process.env.CORS_ORIGIN || 'http://localhost:5173',
}

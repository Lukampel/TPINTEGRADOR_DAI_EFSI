import pg from 'pg'
import { env } from '../config/env.js'

// Pool = varias conexiones abiertas que se reutilizan entre requests,
// en vez de abrir y cerrar una conexión a Neon por cada consulta.
export const pool = new pg.Pool({
  connectionString: env.databaseUrl,
  max: 10,
})

// Atajo para las consultas simples de los models: query('SELECT ... $1', [valor])
export function query(text, params) {
  return pool.query(text, params)
}

// Para operaciones que tocan varias tablas (p. ej. acción + fila en activity):
// todo se confirma junto o se deshace junto.
export async function withTransaction(fn) {
  const client = await pool.connect()
  try {
    await client.query('BEGIN')
    const result = await fn(client)
    await client.query('COMMIT')
    return result
  } catch (err) {
    await client.query('ROLLBACK')
    throw err
  } finally {
    client.release()
  }
}

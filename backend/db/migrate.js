import { readdir, readFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { pool } from '../src/db/pool.js'

// Runner de migraciones: `npm run migrate`
// 1. Se asegura de que exista la tabla schema_migrations (el "registro" de lo ya aplicado).
// 2. Lee db/migrations/NNN_*.sql en orden.
// 3. Aplica solo las que no están registradas, cada una en su propia transacción:
//    si un archivo falla, no queda a medias y no se anota.
// Se puede correr las veces que quieras: lo ya aplicado se saltea.

const MIGRATIONS_DIR = path.join(path.dirname(fileURLToPath(import.meta.url)), 'migrations')

async function migrate() {
  const client = await pool.connect()
  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS schema_migrations (
        filename   VARCHAR(255) PRIMARY KEY,
        applied_at TIMESTAMPTZ  NOT NULL DEFAULT now()
      )
    `)

    const { rows } = await client.query('SELECT filename FROM schema_migrations')
    const applied = new Set(rows.map((r) => r.filename))

    const files = (await readdir(MIGRATIONS_DIR)).filter((f) => /^\d+_.+\.sql$/.test(f)).sort()
    const pending = files.filter((f) => !applied.has(f))

    if (pending.length === 0) {
      console.log('Nada para migrar: la base está al día.')
      return
    }

    for (const file of pending) {
      const sql = await readFile(path.join(MIGRATIONS_DIR, file), 'utf8')
      try {
        await client.query('BEGIN')
        await client.query(sql)
        await client.query('INSERT INTO schema_migrations (filename) VALUES ($1)', [file])
        await client.query('COMMIT')
        console.log(`✔ ${file}`)
      } catch (err) {
        await client.query('ROLLBACK')
        throw new Error(`Falló ${file}: ${err.message}`)
      }
    }
    console.log(`Listo: ${pending.length} migración(es) aplicada(s).`)
  } finally {
    client.release()
    await pool.end()
  }
}

migrate().catch((err) => {
  console.error(err.message)
  process.exit(1)
})

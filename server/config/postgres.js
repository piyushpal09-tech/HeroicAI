const { Pool } = require('pg')

let pool = null

const getPostgresPool = () => {
  if (!process.env.POSTGRES_URL) {
    return null
  }

  if (!pool) {
    pool = new Pool({
      connectionString: process.env.POSTGRES_URL,
      ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
    })

    pool.on('error', (error) => {
      console.error(`Postgres error: ${error.message}`)
    })
  }

  return pool
}

module.exports = {
  getPostgresPool,
}

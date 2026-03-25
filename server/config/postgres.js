const { Pool } = require('pg')

let pool = null

const resolveSslConfig = () => {
  const explicitSetting = (process.env.POSTGRES_SSL || '').trim().toLowerCase()
  const connectionString = (process.env.POSTGRES_URL || '').trim().toLowerCase()

  if (explicitSetting === 'true') {
    return { rejectUnauthorized: false }
  }

  if (explicitSetting === 'false') {
    return false
  }

  if (connectionString.includes('sslmode=require')) {
    return { rejectUnauthorized: false }
  }

  if (connectionString.includes('sslmode=disable')) {
    return false
  }

  return false
}

const getPostgresPool = () => {
  if (!process.env.POSTGRES_URL) {
    return null
  }

  if (!pool) {
    pool = new Pool({
      connectionString: process.env.POSTGRES_URL,
      ssl: resolveSslConfig(),
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

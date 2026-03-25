const Redis = require('ioredis')

const memoryStore = new Map()
let redisClient = null
let attemptedConnection = false

const readMemory = (key) => {
  const entry = memoryStore.get(key)

  if (!entry) {
    return null
  }

  if (entry.expiresAt < Date.now()) {
    memoryStore.delete(key)
    return null
  }

  return entry.value
}

const writeMemory = (key, value, ttlSeconds) => {
  memoryStore.set(key, {
    value,
    expiresAt: Date.now() + ttlSeconds * 1000,
  })
}

const getRedisClient = async () => {
  if (!process.env.REDIS_URL) {
    return null
  }

  if (!redisClient) {
    redisClient = new Redis(process.env.REDIS_URL, {
      lazyConnect: true,
      maxRetriesPerRequest: 1,
      enableReadyCheck: true,
    })

    redisClient.on('error', (error) => {
      console.error(`Redis error: ${error.message}`)
    })
  }

  if (!attemptedConnection) {
    attemptedConnection = true
    try {
      await redisClient.connect()
      console.log('Redis connected')
    } catch (error) {
      console.error(`Redis connection failed: ${error.message}`)
      return null
    }
  }

  return redisClient.status === 'ready' ? redisClient : null
}

const cacheStore = {
  async get(key) {
    const client = await getRedisClient()

    if (client) {
      return client.get(key)
    }

    return readMemory(key)
  },

  async set(key, value, ttlSeconds = 900) {
    const client = await getRedisClient()

    if (client) {
      await client.set(key, value, 'EX', ttlSeconds)
      return
    }

    writeMemory(key, value, ttlSeconds)
  },

  async del(key) {
    const client = await getRedisClient()

    if (client) {
      await client.del(key)
      return
    }

    memoryStore.delete(key)
  },
}

module.exports = {
  cacheStore,
  getRedisClient,
}

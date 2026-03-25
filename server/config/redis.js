const Redis = require('ioredis')

const memoryStore = new Map()
let redisClient = null
let connectionPromise = null

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

const createRedisClient = () => {
  const client = new Redis(process.env.REDIS_URL, {
    lazyConnect: true,
    maxRetriesPerRequest: 1,
    enableReadyCheck: true,
  })

  client.on('error', (error) => {
    console.error(`Redis error: ${error.message}`)
  })

  client.on('end', () => {
    if (redisClient === client) {
      redisClient = null
    }
  })

  return client
}

const getOrCreateRedisClient = () => {
  if (!redisClient || ['close', 'end'].includes(redisClient.status)) {
    redisClient = createRedisClient()
  }

  return redisClient
}

const getRedisClient = async () => {
  if (!process.env.REDIS_URL) {
    return null
  }

  const client = getOrCreateRedisClient()

  if (client.status === 'ready') {
    return client
  }

  if (!connectionPromise) {
    connectionPromise = (async () => {
      const activeClient = getOrCreateRedisClient()

      if (activeClient.status === 'ready') {
        return activeClient
      }

      if (activeClient.status === 'wait') {
        await activeClient.connect()
      }

      if (activeClient.status === 'ready') {
        console.log('Redis connected')
        return activeClient
      }

      return null
    })()
      .catch((error) => {
        console.error(`Redis connection failed: ${error.message}`)
        if (redisClient && redisClient.status === 'end') {
          redisClient = null
        }
        return null
      })
      .finally(() => {
        connectionPromise = null
      })
  }

  const connectedClient = await connectionPromise

  if (connectedClient?.status === 'ready') {
    return connectedClient
  }

  return null
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

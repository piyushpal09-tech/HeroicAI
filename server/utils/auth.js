const jwt = require('jsonwebtoken')
const { cacheStore } = require('../config/redis')

const SESSION_TTL_SECONDS = 15 * 60

const getNextResetDate = () => new Date(Date.now() + 24 * 60 * 60 * 1000)

const sanitizeUser = (user) => {
  if (!user) {
    return null
  }

  const source = typeof user.toObject === 'function' ? user.toObject() : user

  return {
    _id: String(source._id),
    name: source.name,
    email: source.email,
    plan: source.plan,
    dailyUsage: source.dailyUsage,
    toolHistory: source.toolHistory || [],
    createdAt: source.createdAt,
  }
}

const signToken = (userId) =>
  jwt.sign({ userId }, process.env.JWT_SECRET || 'heroicai-dev-secret', {
    expiresIn: '7d',
  })

const getCookieOptions = () => ({
  httpOnly: true,
  sameSite: 'lax',
  secure: process.env.NODE_ENV === 'production',
  maxAge: 7 * 24 * 60 * 60 * 1000,
})

const getSessionKey = (token) => `session:${token}`

const cacheSession = async (token, user) => {
  await cacheStore.set(getSessionKey(token), JSON.stringify(sanitizeUser(user)), SESSION_TTL_SECONDS)
}

const clearSession = async (token) => {
  if (!token) {
    return
  }

  await cacheStore.del(getSessionKey(token))
}

module.exports = {
  SESSION_TTL_SECONDS,
  cacheSession,
  clearSession,
  getCookieOptions,
  getNextResetDate,
  getSessionKey,
  sanitizeUser,
  signToken,
}

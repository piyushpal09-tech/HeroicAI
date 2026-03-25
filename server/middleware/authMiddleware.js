const jwt = require('jsonwebtoken')
const { cacheStore } = require('../config/redis')
const { findUserById } = require('../utils/userRepo')
const { getSessionKey, sanitizeUser } = require('../utils/auth')

const getTokenFromRequest = (req) => {
  const authHeader = req.headers.authorization || ''

  if (req.cookies?.heroicai_token) {
    return req.cookies.heroicai_token
  }

  if (authHeader.startsWith('Bearer ')) {
    return authHeader.replace('Bearer ', '')
  }

  return null
}

const authMiddleware = async (req, res, next) => {
  try {
    const token = getTokenFromRequest(req)

    if (!token) {
      return res.status(401).json({ message: 'Authentication required.' })
    }

    const cachedUser = await cacheStore.get(getSessionKey(token))

    if (cachedUser) {
      req.token = token
      req.user = JSON.parse(cachedUser)
      req.userId = req.user._id
      return next()
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'heroicai-dev-secret')
    const user = await findUserById(decoded.userId)

    if (!user) {
      return res.status(401).json({ message: 'User session is invalid.' })
    }

    const safeUser = sanitizeUser(user)
    req.token = token
    req.user = safeUser
    req.userId = safeUser._id
    await cacheStore.set(getSessionKey(token), JSON.stringify(safeUser), 15 * 60)

    return next()
  } catch (error) {
    return res.status(401).json({ message: 'Invalid or expired token.' })
  }
}

module.exports = authMiddleware

const { checkAndIncrementUsage } = require('../utils/userRepo')
const { cacheSession, sanitizeUser } = require('../utils/auth')

const rateLimiter = async (req, res, next) => {
  if (req.user?.plan !== 'free') {
    return next()
  }

  const result = await checkAndIncrementUsage(req.userId)

  if (!result.allowed) {
    return res.status(429).json({
      message: result.reason || 'Daily request limit reached.',
    })
  }

  const safeUser = sanitizeUser(result.user)
  req.user = safeUser

  if (req.token) {
    await cacheSession(req.token, safeUser)
  }

  return next()
}

module.exports = rateLimiter

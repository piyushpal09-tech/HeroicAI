const express = require('express')
const authMiddleware = require('../middleware/authMiddleware')
const { findUserById } = require('../utils/userRepo')
const { sanitizeUser } = require('../utils/auth')

const router = express.Router()

router.get('/profile', authMiddleware, async (req, res) => {
  const user = await findUserById(req.userId)

  if (!user) {
    return res.status(404).json({ message: 'User not found.' })
  }

  return res.json({ user: sanitizeUser(user) })
})

router.get('/history', authMiddleware, async (req, res) => {
  const user = await findUserById(req.userId)

  if (!user) {
    return res.status(404).json({ message: 'User not found.' })
  }

  return res.json({ history: sanitizeUser(user).toolHistory || [] })
})

module.exports = router

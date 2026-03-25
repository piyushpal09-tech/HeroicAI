const express = require('express')
const bcrypt = require('bcrypt')
const authMiddleware = require('../middleware/authMiddleware')
const { createUser, findUserByEmail } = require('../utils/userRepo')
const {
  cacheSession,
  clearSession,
  getCookieOptions,
  sanitizeUser,
  signToken,
} = require('../utils/auth')

const router = express.Router()

router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Name, email, and password are required.' })
    }

    const existingUser = await findUserByEmail(email)

    if (existingUser) {
      return res.status(409).json({ message: 'An account with that email already exists.' })
    }

    const hashedPassword = await bcrypt.hash(password, 12)
    const user = await createUser({
      name,
      email,
      password: hashedPassword,
    })

    const token = signToken(user._id)
    const safeUser = sanitizeUser(user)
    await cacheSession(token, safeUser)

    res.cookie('heroicai_token', token, getCookieOptions())

    return res.status(201).json({
      token,
      user: safeUser,
    })
  } catch (error) {
    return res.status(500).json({ message: error.message || 'Registration failed.' })
  }
})

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required.' })
    }

    const user = await findUserByEmail(email)

    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password.' })
    }

    const validPassword = await bcrypt.compare(password, user.password)

    if (!validPassword) {
      return res.status(401).json({ message: 'Invalid email or password.' })
    }

    const token = signToken(user._id)
    const safeUser = sanitizeUser(user)
    await cacheSession(token, safeUser)

    res.cookie('heroicai_token', token, getCookieOptions())

    return res.json({
      token,
      user: safeUser,
    })
  } catch (error) {
    return res.status(500).json({ message: error.message || 'Login failed.' })
  }
})

router.post('/logout', authMiddleware, async (req, res) => {
  await clearSession(req.token)
  res.clearCookie('heroicai_token', getCookieOptions())
  return res.json({ message: 'Logged out successfully.' })
})

router.get('/me', authMiddleware, async (req, res) => {
  return res.json({ user: req.user })
})

module.exports = router

const crypto = require('crypto')
const User = require('../models/User')
const { isDatabaseConnected } = require('../config/db')
const { getNextResetDate } = require('./auth')

const memoryUsers = new Map()

const normalizeEmail = (email) => email.trim().toLowerCase()

const cloneMemoryUser = (user) => JSON.parse(JSON.stringify(user))

const ensureDailyUsage = (user) => {
  if (!user.dailyUsage || !user.dailyUsage.resetAt || new Date(user.dailyUsage.resetAt) <= new Date()) {
    user.dailyUsage = {
      count: 0,
      resetAt: getNextResetDate(),
    }
  }
}

const findUserByEmail = async (email) => {
  if (isDatabaseConnected()) {
    return User.findOne({ email: normalizeEmail(email) })
  }

  const normalizedEmail = normalizeEmail(email)
  return [...memoryUsers.values()].find((user) => user.email === normalizedEmail) || null
}

const findUserById = async (id) => {
  if (isDatabaseConnected()) {
    return User.findById(id)
  }

  return memoryUsers.get(String(id)) || null
}

const createUser = async ({ name, email, password, plan = 'free', authProvider = 'local', googleId = null }) => {
  if (isDatabaseConnected()) {
    const userPayload = {
      name,
      email: normalizeEmail(email),
      authProvider,
      plan,
      dailyUsage: {
        count: 0,
        resetAt: getNextResetDate(),
      },
    }

    if (password) {
      userPayload.password = password
    }

    if (googleId) {
      userPayload.googleId = googleId
    }

    const user = new User(userPayload)

    await user.save()
    return user
  }

  const id = crypto.randomUUID()
  const user = {
    _id: id,
    name,
    email: normalizeEmail(email),
    authProvider,
    plan,
    dailyUsage: {
      count: 0,
      resetAt: getNextResetDate(),
    },
    toolHistory: [],
    createdAt: new Date(),
  }

  if (password) {
    user.password = password
  }

  if (googleId) {
    user.googleId = googleId
  }

  memoryUsers.set(id, user)
  return cloneMemoryUser(user)
}

const saveUser = async (user) => {
  if (!user) {
    return null
  }

  if (isDatabaseConnected() && typeof user.save === 'function') {
    await user.save()
    return user
  }

  const normalizedUser = cloneMemoryUser(user)
  memoryUsers.set(String(normalizedUser._id), normalizedUser)
  return cloneMemoryUser(normalizedUser)
}

const findOrCreateGoogleUser = async ({ email, name, googleId }) => {
  const normalizedEmail = normalizeEmail(email)
  const existingUser = await findUserByEmail(normalizedEmail)

  if (existingUser) {
    let hasChanges = false

    if (!existingUser.name && name) {
      existingUser.name = name
      hasChanges = true
    }

    if (!existingUser.googleId && googleId) {
      existingUser.googleId = googleId
      hasChanges = true
    }

    if (!existingUser.password && existingUser.authProvider !== 'google') {
      existingUser.authProvider = 'google'
      hasChanges = true
    }

    if (hasChanges) {
      return saveUser(existingUser)
    }

    return existingUser
  }

  return createUser({
    name: name || normalizedEmail.split('@')[0],
    email: normalizedEmail,
    password: null,
    authProvider: 'google',
    googleId,
  })
}

const checkAndIncrementUsage = async (userId) => {
  const user = await findUserById(userId)

  if (!user) {
    return { allowed: false, reason: 'User not found.' }
  }

  ensureDailyUsage(user)

  if (user.plan !== 'free') {
    return { allowed: true, user }
  }

  if (user.dailyUsage.count >= 10) {
    return {
      allowed: false,
      user,
      reason: 'Daily free-plan request limit reached.',
    }
  }

  user.dailyUsage.count += 1
  const savedUser = await saveUser(user)

  return { allowed: true, user: savedUser }
}

const recordToolHistory = async (userId, entry) => {
  const user = await findUserById(userId)

  if (!user) {
    return null
  }

  user.toolHistory = [
    {
      ...entry,
      createdAt: entry.createdAt || new Date(),
    },
    ...(user.toolHistory || []),
  ].slice(0, 50)

  return saveUser(user)
}

module.exports = {
  checkAndIncrementUsage,
  createUser,
  findUserByEmail,
  findUserById,
  findOrCreateGoogleUser,
  recordToolHistory,
  saveUser,
}

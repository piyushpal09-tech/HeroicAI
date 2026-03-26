const express = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const authMiddleware = require('../middleware/authMiddleware')
const { createUser, findOrCreateGoogleUser, findUserByEmail } = require('../utils/userRepo')
const {
  cacheSession,
  clearSession,
  getCookieOptions,
  sanitizeUser,
  signToken,
} = require('../utils/auth')

const router = express.Router()
const GOOGLE_AUTH_URL = 'https://accounts.google.com/o/oauth2/v2/auth'
const GOOGLE_TOKEN_URL = 'https://oauth2.googleapis.com/token'
const GOOGLE_USERINFO_URL = 'https://openidconnect.googleapis.com/v1/userinfo'

const getJwtSecret = () => process.env.JWT_SECRET || 'heroicai-dev-secret'

const getClientUrl = () => process.env.CLIENT_URL || 'http://localhost:5173'

const sanitizeReturnTo = (value) => {
  if (typeof value !== 'string') {
    return '/dashboard'
  }

  if (!value.startsWith('/') || value.startsWith('//')) {
    return '/dashboard'
  }

  return value
}

const getClientCallbackUrl = ({ token, returnTo, error }) => {
  const callbackUrl = new URL('/auth/callback', getClientUrl())

  if (token) {
    callbackUrl.searchParams.set('token', token)
  }

  if (returnTo) {
    callbackUrl.searchParams.set('returnTo', sanitizeReturnTo(returnTo))
  }

  if (error) {
    callbackUrl.searchParams.set('error', error)
  }

  return callbackUrl.toString()
}

const getGoogleRedirectUri = (req) => {
  const forwardedProto = req.get('x-forwarded-proto')
  const forwardedHost = req.get('x-forwarded-host')
  const protocol = (forwardedProto || req.protocol || 'http').split(',')[0].trim()
  const host = (forwardedHost || req.get('host') || '').split(',')[0].trim()

  return `${protocol}://${host}/api/auth/google/callback`
}

const getGoogleOAuthConfig = (req) => {
  const clientId = process.env.GOOGLE_CLIENT_ID
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET

  if (!clientId || !clientSecret) {
    return null
  }

  return {
    clientId,
    clientSecret,
    redirectUri: getGoogleRedirectUri(req),
  }
}

const createGoogleState = (returnTo) =>
  jwt.sign({ returnTo: sanitizeReturnTo(returnTo) }, getJwtSecret(), {
    expiresIn: '10m',
  })

const parseGoogleState = (stateToken) => {
  if (!stateToken) {
    return '/dashboard'
  }

  const decoded = jwt.verify(stateToken, getJwtSecret())
  return sanitizeReturnTo(decoded.returnTo)
}

const exchangeGoogleCode = async ({ code, clientId, clientSecret, redirectUri }) => {
  const response = await fetch(GOOGLE_TOKEN_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      code,
      client_id: clientId,
      client_secret: clientSecret,
      redirect_uri: redirectUri,
      grant_type: 'authorization_code',
    }),
  })

  const payload = await response.json()

  if (!response.ok) {
    throw new Error(payload.error_description || payload.error || 'Unable to complete Google sign-in.')
  }

  return payload
}

const fetchGoogleProfile = async (accessToken) => {
  const response = await fetch(GOOGLE_USERINFO_URL, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })

  const payload = await response.json()

  if (!response.ok) {
    throw new Error(payload.error_description || payload.error || 'Unable to fetch Google profile.')
  }

  return payload
}

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

    if (!user.password) {
      return res.status(401).json({ message: 'This account uses Google sign-in. Continue with Google instead.' })
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

router.get('/google/start', async (req, res) => {
  const config = getGoogleOAuthConfig(req)
  const returnTo = sanitizeReturnTo(req.query.returnTo)

  if (!config) {
    return res.redirect(
      getClientCallbackUrl({
        error: 'Google sign-in is not configured yet.',
        returnTo,
      }),
    )
  }

  const authorizationUrl = new URL(GOOGLE_AUTH_URL)
  authorizationUrl.searchParams.set('client_id', config.clientId)
  authorizationUrl.searchParams.set('redirect_uri', config.redirectUri)
  authorizationUrl.searchParams.set('response_type', 'code')
  authorizationUrl.searchParams.set('scope', 'openid email profile')
  authorizationUrl.searchParams.set('access_type', 'offline')
  authorizationUrl.searchParams.set('prompt', 'consent')
  authorizationUrl.searchParams.set('state', createGoogleState(returnTo))

  return res.redirect(authorizationUrl.toString())
})

router.get('/google/callback', async (req, res) => {
  try {
    const config = getGoogleOAuthConfig(req)
    const { code, state } = req.query
    const returnTo = parseGoogleState(state)

    if (!config) {
      return res.redirect(
        getClientCallbackUrl({
          error: 'Google sign-in is not configured yet.',
          returnTo,
        }),
      )
    }

    if (!code) {
      return res.redirect(
        getClientCallbackUrl({
          error: 'Google did not return an authorization code.',
          returnTo,
        }),
      )
    }

    const tokenPayload = await exchangeGoogleCode({
      code,
      clientId: config.clientId,
      clientSecret: config.clientSecret,
      redirectUri: config.redirectUri,
    })

    const googleProfile = await fetchGoogleProfile(tokenPayload.access_token)

    if (!googleProfile.email || googleProfile.email_verified === false) {
      return res.redirect(
        getClientCallbackUrl({
          error: 'Google did not return a verified email address.',
          returnTo,
        }),
      )
    }

    const user = await findOrCreateGoogleUser({
      email: googleProfile.email,
      name: googleProfile.name,
      googleId: googleProfile.sub,
    })

    const token = signToken(user._id)
    const safeUser = sanitizeUser(user)
    await cacheSession(token, safeUser)

    res.cookie('heroicai_token', token, getCookieOptions())

    return res.redirect(
      getClientCallbackUrl({
        token,
        returnTo,
      }),
    )
  } catch (error) {
    return res.redirect(
      getClientCallbackUrl({
        error: error.message || 'Unable to complete Google sign-in.',
        returnTo: '/dashboard',
      }),
    )
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

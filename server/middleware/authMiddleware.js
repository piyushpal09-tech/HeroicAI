const { clerkClient, createClerkClient } = require('@clerk/express')

// Verify the Clerk session token from the Authorization header or cookie
const authMiddleware = async (req, res, next) => {
  try {
    // Support both Bearer token and Clerk session cookie
    const authHeader = req.headers.authorization || ''
    const sessionToken =
      (authHeader.startsWith('Bearer ') ? authHeader.replace('Bearer ', '') : null) ||
      req.cookies?.['__session'] ||
      req.cookies?.['heroicai_token']

    if (!sessionToken) {
      return res.status(401).json({ message: 'Authentication required.' })
    }

    // Verify the JWT with Clerk's SDK
    const clerk = createClerkClient({ secretKey: process.env.CLERK_SECRET_KEY })
    const payload = await clerk.verifyToken(sessionToken)

    if (!payload?.sub) {
      return res.status(401).json({ message: 'Invalid or expired session.' })
    }

    // Attach Clerk's userId (sub) as req.userId for route handlers
    req.userId = payload.sub
    req.token = sessionToken

    // Optionally attach minimal user info from the token claims
    req.user = {
      _id: payload.sub,
      name: payload.name || null,
      email: payload.email || null,
    }

    return next()
  } catch (error) {
    return res.status(401).json({ message: 'Invalid or expired token.' })
  }
}

module.exports = authMiddleware

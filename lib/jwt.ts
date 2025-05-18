import jwt from 'jsonwebtoken'

const secret = process.env.JWT_SECRET || 'defaultsecret'

export function generateToken(payload: object, expiresIn = process.env.JWT_EXPIRES_IN || '7d') {
  const expirationTime = expiresIn.includes('s') ? parseInt(expiresIn) : parseInt(expiresIn) * 60 * 60 * 24; // convert to seconds
  return jwt.sign(payload, secret, { expiresIn: expirationTime })
}

export function verifyToken(token: string) {
  try {
    return jwt.verify(token, secret)
  } catch (err) {
    return null
  }
}

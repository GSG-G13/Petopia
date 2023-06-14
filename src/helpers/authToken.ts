import jwt, { type Secret, type JwtPayload } from 'jsonwebtoken'
import { config } from 'dotenv'
import { type User } from '../interfaces/iAuth'
config()

const { SECRET_KEY } = process.env

const generateToken = async (payload: JwtPayload): Promise<string | JwtPayload | undefined> =>
  await new Promise((resolve, reject) => {
    jwt.sign(payload, SECRET_KEY as Secret, (err, token) => {
      if (err != null) reject(err)
      else resolve(token)
    })
  })

const verifyToken = async (token: string): Promise<User> =>
  await new Promise((resolve, reject) => {
    jwt.verify(token, SECRET_KEY as Secret, (err, decode) => {
      if (err != null) reject(err)
      else resolve(decode as User)
    })
  })

export { generateToken, verifyToken }

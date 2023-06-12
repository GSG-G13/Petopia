import { sign, verify, type Secret } from 'jsonwebtoken'
import { config } from 'dotenv'
config()

const { SECRET_KEY } = process.env

// const generateToken = async (payload: string | object): Promise<string> =>
//   await new Promise<string>((resolve, reject) => {
//     if (SECRET_KEY == null) {
//       reject(new Error('Secret key is undefined'))
//     }
//     sign(payload, SECRET_KEY as Secret, (err, token) => {
//       if (err != null) reject(err)
//       else resolve(token)
//     })
//   })
const signAsync = promisify(sign)
const generateToken = async (payload: string | object): Promise<string> => {
  if (SECRET_KEY == null) {
    throw new Error('Secret key is undefined')
  }

  const token = await signAsync(payload, SECRET_KEY as Secret)
  return token
}

const verifyToken = async (token) =>
  await new Promise((resolve, reject) => {
    verify(token, SECRET_KEY as Secret, (err, decode) => {
      if (err != null) reject(err)
      else resolve(decode)
    })
  })
export { generateToken, verifyToken }

import { type Request, type Response } from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import loginQuery from '../../queries/auth/login'
import { loginSchema } from '../../validation/users'

const loginUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body

    await loginSchema.validate({ email, password })

    const data = await loginQuery({ email })

    if (data != null) {
      const { user_id, user_type, email, password: hashedPassword } = data

      const result = await bcrypt.compare(password, hashedPassword)

      if (result) {
        const payload = {
          user_id,
          user_type,
          email
        }

        const token = jwt.sign(payload, process.env.SECRET_KEY as string)

        return res.cookie('token', token).json({ err: false, msg: 'Login successfully' })
      } else {
        res.status(400).json({ err: true, msg: 'Wrong password' })
      }
    } else {
      res.status(401).json({ err: true, msg: 'Please create an account first' })
    }
  } catch (error) {
    res.status(400).json({ msg: (error as Error).message })
  }
}

export { loginUsers }

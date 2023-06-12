import type { Request, Response } from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import loginQuery from '../../queries/users/login'
import { loginSchema } from '../../validation/users'

const handleLogin = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body

  try {
    await loginSchema.validate({ email, password }, { abortEarly: false })

    const data = await loginQuery({ email })

    if (data != null) {
      const { user_id, full_name, password: hashedPassword } = data

      const result = await bcrypt.compare(password, hashedPassword)

      if (result) {
        const payload = {
          user_id,
          full_name
        }

        const token = jwt.sign(payload, process.env.SECRET_KEY as string)

        res.cookie('token', token).json({ err: false, msg: 'Login successfully' })
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

export { handleLogin }

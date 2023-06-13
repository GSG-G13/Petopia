import { type NextFunction, type Request, type Response } from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import loginQuery from '../../queries/auth/login'
import { loginSchema } from '../../validation/users'
import CustomError from '../../helpers/CustomError'

const loginUsers = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
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

        res.cookie('token', token).status(202).json({ err: false, msg: 'Login successfully' })
      } else {
        next(new CustomError(400, 'Wrong password'))
      }
    } else {
      next(new CustomError(401, 'Please create an account first'))
    }
  } catch (error) {
    next(error)
  }
}

export { loginUsers }

import { type NextFunction, type Request, type Response } from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import loginQuery from '../../queries/auth/login'
import { loginSchema } from '../../validation/auth/login'
import CustomError from '../../helpers/CustomError'

const loginUsers = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { email, password } = await loginSchema.validate(req.body)

    const data = await loginQuery({ email })

    if (data != null) {
      const { userId, userType, email, password: hashedPassword } = data

      const isPasswordTrue = await bcrypt.compare(password, hashedPassword)

      if (isPasswordTrue) {
        const payload = {
          userId,
          userType,
          email
        }

        const token = jwt.sign(payload, process.env.SECRET_KEY as string)

        res.cookie('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' })
          .json({ message: 'Login successfully' })
      } else {
        throw new CustomError(400, 'Wrong Password')
      }
    } else {
      throw new CustomError(401, 'Please create an account first')
    }
  } catch (error) {
    next(error)
  }
}

export default loginUsers

import { type Request, type Response, type NextFunction } from 'express'
import jwt, { type Secret } from 'jsonwebtoken'
import dotenv from 'dotenv'
import bcrypt from 'bcrypt'
import { createUser } from '../../queries/user/signup'
import { type IUser } from '../../interfaces/fakeDataTypes'
import { validateSignup } from '../../validation/auth/signup'
import CustomError from '../../helpers/CustomError'

dotenv.config()

interface UserPayload {
  userId: number
  email: string
}

const { SECRET_KEY } = process.env

const signToken = (user: UserPayload): string => {
  const token = jwt.sign(
    {
      userId: user.userId,
      email: user.email
    },
    SECRET_KEY as Secret,
    {
      expiresIn: '1h'
    }
  )
  return token
}

const signup = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const {
      fullName,
      email,
      password,
      phone,
      userImage,
      profileImage,
      address,
      userType,
      status
    }: IUser = await validateSignup(req.body)

    const hashedPassword = await bcrypt.hash(password, 10)

    const newUser = await createUser({
      fullName,
      email,
      password: hashedPassword,
      phone,
      userImage,
      profileImage,
      address,
      userType,
      status
    })

    const token = signToken({ userId: newUser.userId, email: newUser.email })

    res.cookie('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' })
      .json({
        message: 'User Created Successfully',
        data: {
          fullName,
          email: newUser.email,
          phone: newUser.phone,
          userImage,
          profileImage,
          address,
          userType,
          status
        }
      })
  } catch (error: unknown) {
    if ((error as { name?: string }).name === 'ValidationError') {
      const validationErrors = (error as { errors: string[] }).errors.map((err: string) => ({
        message: err
      }))
      res.status(400).json({ error: 'Validation Error', details: validationErrors })
    } else {
      console.error('Error occurred during signup:', error)
      next(new CustomError(500, 'Server Error'))
    }
  }
}

export { signup }
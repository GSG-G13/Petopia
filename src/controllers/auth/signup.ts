import { type Request, type Response, type NextFunction } from 'express'
import jwt, { type Secret } from 'jsonwebtoken'
import dotenv from 'dotenv'
import bcrypt from 'bcrypt'
import { createUser } from '../../queries'
import { type IUser } from '../../interfaces/fakeDataTypes'
import { validateSignup } from '../../validation/auth/signup'

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
      .status(201)
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
  } catch (err: unknown) {
    next(err)
  }
}

export default signup

import User from '../../models/User'
import { type IUser } from '../../interfaces/models'

interface CreateUserProps {
  fullName: string
  email: string
  password: string
  phone?: string
  userImage?: string
  profileImage?: string
  address?: string
  userType?: string
  status: string
}
interface INewUser extends IUser {
  userId: number
}

const createUser = async ({
  fullName,
  email,
  password,
  phone,
  userImage,
  profileImage,
  address,
  userType,
  status
}: CreateUserProps): Promise<INewUser> => {
  const existingUser = await User.findOne({ where: { email } })
  if (existingUser != null) {
    throw new Error('Email already exists')
  }

  // Create the new user
  const newUser = await User.create({
    fullName,
    email,
    password,
    phone,
    userImage,
    profileImage,
    address,
    userType,
    status
  })

  return newUser
}

export { createUser }

import User from '../../models/User'
import { type IUser } from '../../interfaces/fakeDataTypes'
import CustomError from '../../helpers/CustomError'

interface INewUser extends IUser {
  userId: number
}

const createUser = async ({
  fullName, email, password, phone, userImage, profileImage, address, userType, status
}: IUser): Promise<INewUser> => {
  const existingUser = await User.findOne({ where: { email } })
  if (existingUser != null) {
    throw new CustomError(400, 'Email already exists')
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

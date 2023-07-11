interface IUser {
  userId: number
  fullName: string
  email: string
  userImage: string
  profileImage?: string
  address: string
  phone: string
  followerCount: number
  followingCount: number
  userType: string
}
export default IUser;

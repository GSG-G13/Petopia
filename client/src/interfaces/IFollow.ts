interface IFollow {
  followId: number
  followerId: number
  followingId: number
  createdAt: string
  updatedAt: string
  followingUser: {
    fullName: string
    userImage: string
  }
}
export default IFollow;

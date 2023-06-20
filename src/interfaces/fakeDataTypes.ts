export interface IUser {
  fullName: string
  email: string
  password: string
  phone?: string
  userImage?: string
  profileImage?: string
  address?: string
  userType?: string
  status?: string
  followerCount?: number
  followingCount?: number

}

export interface ICategory {
  title: string
}

export interface IPetType {
  title: string
}

export interface IPost {
  userId: number
  categoryId: number
  postContent: string
  isHaveImg: boolean
  likesCount: number
  commentsCount: number

}

export interface IPostImage {
  postId: number
  imageUrl: string
}

export interface IComment {
  userId: number
  postId: number
  commentText: string
}

export interface ILike {
  userId: number
  postId: number
}

export interface IFollower {
  followerId: number
  followingId: number

}

export interface IProduct {
  postId: number
  title: string
  price: number
  details: string
  rating: number
}

export interface IPet {
  postId: number
  petName: string
  petType: number
  age: number
  gender: string
  healthStatus: string
  adoptionStatus: string
}

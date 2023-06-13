export interface IUser {
  fullName: string
  email: string
  password: string
  userImage?: string
  profileImage?: string
  address?: string
  phone?: string
  userType?: string
  status: string
}

export interface ICategory {
  title: string
}

export interface IPetType {
  title: string
}

export interface IPost {
  user_id: number
  category_id: number
  post_content: string
  is_have_img: boolean
}

export interface IPostImage {
  post_id: number
  image_url: string
}

export interface IComment {
  user_id: number
  post_id: number
  comment_text: string
}

export interface ILike {
  user_id: number
  post_id: number
}

export interface IFollower {
  follower_id: number
  following_id: number
}

export interface IProduct {
  post_id: number
  title: string
  price: number
  details: string
  rating: number
}

export interface IPet {
  post_id: number
  pet_name: string
  pet_type: number
  age: number
  gender: string
  health_status: string
  adoption_status: string
}

export interface User {
  full_name: string
  email: string
  password: string
  user_image?: string
  profile_image?: string
  address?: string
  phone?: string
  user_type?: string
  status: string
}

export interface Category {
  title: string
}

export interface PetType {
  title: string
}

export interface Post {
  user_id: number
  category_id: number
  post_content: string
  is_have_img: boolean
}

export interface PostImage {
  post_id: number
  image_url: string
}

export interface Comment {
  user_id: number
  post_id: number
  comment_text: string
}

export interface Like {
  user_id: number
  post_id: number
}

export interface Follower {
  follower_id: number
  following_id: number
}

export interface Product {
  post_id: number
  title: string
  price: number
  details: string
  rating: number
}

export interface Pet {
  post_id: number
  pet_name: string
  pet_type: number
  age: number
  gender: string
  health_status: string
  adoption_status: string
}

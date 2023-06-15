import {
  type Model,
  type CreationOptional, type InferAttributes, type InferCreationAttributes, type ForeignKey
} from 'sequelize'

interface ICategory extends Model<InferAttributes<ICategory>, InferCreationAttributes<ICategory>> {
  categoryId: CreationOptional<number>
  title: string
}

interface IComment extends Model<InferAttributes<IComment>, InferCreationAttributes<IComment>> {
  comment_id: CreationOptional<number>
  user_id: ForeignKey<number>
  post_id: ForeignKey<number>
  comment_text: string
}

interface IFollower extends Model<InferAttributes<IFollower>, InferCreationAttributes<IFollower>> {
  follow_id: CreationOptional<number>
  follower_id: ForeignKey<number>
  following_id: ForeignKey<number>
}

interface ILike extends Model<InferAttributes<ILike>, InferCreationAttributes<ILike>> {
  like_id: CreationOptional<number>
  user_id: ForeignKey<number>
  post_id: ForeignKey<number>
}

interface IPet extends Model<InferAttributes<IPet>, InferCreationAttributes<IPet>> {
  pet_id: CreationOptional<number>
  post_id: ForeignKey<number>
  pet_name: string
  pet_type: ForeignKey<number>
  age: number
  gender: string
  health_status: string
  adoption_status: string
}

interface IPetType extends Model<InferAttributes<IPetType>, InferCreationAttributes<IPetType>> {
  type_id: CreationOptional<number>
  title: string
}

interface IPost extends Model<InferAttributes<IPost>, InferCreationAttributes<IPost>> {
  post_id: CreationOptional<number>
  userId: ForeignKey<number>
  category_id: number
  post_content: string
  is_have_img: boolean
}

interface IPostImage extends Model<InferAttributes<IPostImage>, InferCreationAttributes<IPostImage>> {
  image_id: CreationOptional<number>
  post_id: ForeignKey<number>
  image_url: string
}

interface IProduct extends Model<InferAttributes<IProduct>, InferCreationAttributes<IProduct>> {
  product_id: CreationOptional<number>
  post_id: ForeignKey<number>
  title: string
  price: number
  details?: string
  rating?: number
}

interface IUser extends Model<InferAttributes<IUser>, InferCreationAttributes<IUser>> {
  userId: CreationOptional<number>
  fullName: string
  email: string
  password: string
  userImage?: string
  profileImage?: string
  address?: string
  phone?: string
  userType?: string
  status?: string
}

export type { ICategory, IComment, IFollower, ILike, IPet, IPetType, IPost, IPostImage, IProduct, IUser }

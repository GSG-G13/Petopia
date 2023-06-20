import {
  type Model,
  type CreationOptional, type InferAttributes, type InferCreationAttributes, type ForeignKey
} from 'sequelize'

interface ICategory extends Model<InferAttributes<ICategory>, InferCreationAttributes<ICategory>> {
  categoryId: CreationOptional<number>
  title: string
}

interface IComment extends Model<InferAttributes<IComment>, InferCreationAttributes<IComment>> {
  commentId: CreationOptional<number>
  userId: ForeignKey<number>
  postId: ForeignKey<number>
  commentText: string
}

interface IFollower extends Model<InferAttributes<IFollower>, InferCreationAttributes<IFollower>> {
  followId: CreationOptional<number>
  followerId: ForeignKey<number>
  followingId: ForeignKey<number>
}

interface ILike extends Model<InferAttributes<ILike>, InferCreationAttributes<ILike>> {
  likeId: CreationOptional<number>
  userId: ForeignKey<number>
  postId: ForeignKey<number>
}

interface IPet extends Model<InferAttributes<IPet>, InferCreationAttributes<IPet>> {
  petId: CreationOptional<number>
  postId: ForeignKey<number>
  petName: string
  petType: ForeignKey<number>
  age: number
  gender: string
  healthStatus: string
  adoptionStatus: string
}

interface IPetType extends Model<InferAttributes<IPetType>, InferCreationAttributes<IPetType>> {
  typeId: CreationOptional<number>
  title: string
}

interface IPost extends Model<InferAttributes<IPost>, InferCreationAttributes<IPost>> {
  postId: CreationOptional<number>
  userId: ForeignKey<number>
  categoryId: number
  postContent: string
  isHaveImg: boolean
  likesCount: number
  commentsCount: number

}

interface IPostImage extends Model<InferAttributes<IPostImage>, InferCreationAttributes<IPostImage>> {
  imageId: CreationOptional<number>
  postId: ForeignKey<number>
  imageUrl: string
}

interface IProduct extends Model<InferAttributes<IProduct>, InferCreationAttributes<IProduct>> {
  productId: CreationOptional<number>
  postId: ForeignKey<number>
  title: string
  price: number
  details: string
  rating: number
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
  followerCount: number
  followingCount: number
}

export type { ICategory, IComment, IFollower, ILike, IPet, IPetType, IPost, IPostImage, IProduct, IUser }

import sequelize from 'sequelize'
import { Category, Pet, PetType, Post, PostImage, Product, User } from '../../models'
import { type IPostWithDetails } from '../../interfaces/iPosts'

const getUserPostsQuery = async (userId: number, page: number, limit: number): Promise<IPostWithDetails[]> => {
  const offset = (page - 1) * limit
  const posts = await Post.findAll({
    where: { userId },
    include: [
      {
        model: PostImage
      },
      {
        model: Category,
        attributes: ['title']
      },
      {
        model: User,
        attributes: ['userId', 'fullName', 'userImage']
      },
      {
        model: Product
      },
      {
        model: Pet,
        include: [{ model: PetType, attributes: ['title'] }]
      }
    ],
    attributes: {
      include: [
        [
          sequelize.literal('(SELECT COUNT(*) FROM likes WHERE likes."postId" = post."postId")'),
          'likeCount'
        ],
        [
          sequelize.literal('(SELECT COUNT(*) FROM comments WHERE comments."postId" = post."postId")'),
          'commentCount'
        ]
      ]
    },
    group: [
      'post.postId',
      'user.userId',
      'postImages.imageId',
      'category.categoryId',
      'products.productId',
      'pets.petId',
      'pets->petType.typeId'
    ],
    order: [['createdAt', 'DESC']],
    limit,
    offset,
    subQuery: false
  })
  return posts
}

export default getUserPostsQuery

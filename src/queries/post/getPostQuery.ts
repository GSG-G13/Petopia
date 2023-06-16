import sequelize from 'sequelize'
import { Category, Pet, PetType, Post, PostImage, Product, User } from '../../models'
import { type IPostWithDetails } from '../../interfaces/iPosts'
// import { type IPost } from '../../interfaces/models'

const gePostQuery = async (id: number): Promise<IPostWithDetails | null > => {
  const post = await Post.findOne({
    where: { postId: id },
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
    ]
  })

  return post
}

export default gePostQuery

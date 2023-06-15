import sequelize from 'sequelize'
import { Category, Pet, PetType, Post, PostImage, Product, User } from '../../models'
import { type IPostWithDetails } from '../../interfaces/iPosts'

const gePostQuery = async (id: number): Promise<IPostWithDetails | null> => {
  const post = await Post.findOne({
    where: { post_id: id },
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
        [sequelize.literal('(SELECT COUNT(*) FROM likes WHERE likes.post_id = post.post_id)'), 'likeCount'],
        [sequelize.literal('(SELECT COUNT(*) FROM comments WHERE comments.post_id = post.post_id)'), 'commentCount']
        // [sequelize.fn('COUNT', sequelize.col('likes.like_id')), 'likeCount'],
        // [sequelize.fn('COUNT', sequelize.col('comments.comment_id')), 'commentCount']
      ]
    },
    group: [
      'post.post_id',
      'user.userId',
      'postImages.image_id',
      'category.category_id',
      'products.product_id',
      'pets.pet_id',
      'pets->petType.type_id'
    ]
  })

  return post
}

export default gePostQuery

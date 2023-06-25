import { Category, Pet, PetType, Post, PostImage, Product, User } from '../../models'
import { type IPostWithDetails } from '../../interfaces/iPosts'

const getExplorePostsQuery = async (page: number, limit: number): Promise<IPostWithDetails[]> => {
  const offset = (page - 1) * limit
  const posts = await Post.findAll({
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
        attributes: ['userId', 'fullName', 'userImage', 'phone']
      },
      {
        model: Product
      },
      {
        model: Pet,
        attributes: ['petId', 'petName', 'age', 'gender', 'healthStatus', 'adoptionStatus'],
        include: [{ model: PetType, attributes: ['typeId', 'title'] }]
      }
    ],
    group: [
      'post.postId',
      'user.userId',
      'postImages.imageId',
      'category.categoryId',
      'products.productId',
      'pets.petId',
      'pets->petType.typeId'
    ],
    order: [['postId', 'DESC']],
    limit,
    offset,
    subQuery: false
  })

  return posts
}

export default getExplorePostsQuery

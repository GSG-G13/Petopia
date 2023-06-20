import { Category, Pet, PetType, Post, PostImage, Product, User } from '../../models'
import { type IPostWithDetails } from '../../interfaces/iPosts'

const getPostQuery = async (id: number): Promise<IPostWithDetails | null > => {
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
    ]
  })

  return post
}

export default getPostQuery

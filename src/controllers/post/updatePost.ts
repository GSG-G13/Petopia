import { type Response, type NextFunction } from 'express'
import { type CustomRequest } from '../../interfaces/iAuth'
import {
  addPetValidation
  , validateAddImage
  , validateAddProduct
  , validateAddPost
} from '../../validation/post'
import { type IPost, type IPostImage } from '../../interfaces/fakeDataTypes'
import {
  getPostQuery,
  updatePostQuery,
  getAllCategoriesQuery,
  updateProductQuery,
  updatePetQuery,
  addImageQuery,
  deleteImageQuery
} from '../../queries'
import CustomError from '../../helpers/CustomError'
import { type ICategory } from '../../interfaces/models'

interface postData {
  categoryId: number
  postContent: string
  isHaveImg: boolean
  imagesUrl: string[]
  title: string
  price: number
  details: string
  rating: number
  petName: string
  type: number
  age: number
  gender: string
  healthStatus: string
  adoptionStatus: string
  commentsCount: number
  likesCount: number
}
const updatePost = async (req: CustomRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = req.user?.userId as number
    const {
      categoryId,
      postContent,
      isHaveImg,
      imagesUrl,
      title,
      price,
      details,
      rating,
      petName,
      type,
      age,
      gender,
      healthStatus,
      adoptionStatus,
      commentsCount,
      likesCount
    } = req.body as postData

    const postData: IPost = { userId, categoryId, postContent, isHaveImg, commentsCount, likesCount }
    const validatePost = await validateAddPost(postData)
    const categories = await getAllCategoriesQuery()
    const isCategory = categories.filter((category: ICategory) => category.categoryId === categoryId).length === 0
    if (isCategory) {
      throw new CustomError(400, 'Bad Request')
    }

    const postId = Number(req.params.postId)
    let updatedPet
    let updatedProduct
    const updatedImages: IPostImage[] = []

    if (postId < 0 || Number.isNaN(postId)) {
      throw new CustomError(400, 'Bad Request')
    }
    const post = await getPostQuery(Number(postId))
    if (post === null) {
      throw new CustomError(400, 'Bad Request')
    }
    if (post.userId !== userId) {
      throw new CustomError(401, 'you are unauthorized to update this post')
    }
    const updatedPost = await updatePostQuery(postId, validatePost)

    if (isHaveImg) {
      if (imagesUrl === undefined || imagesUrl.length === 0) {
        throw new CustomError(400, 'Images is required.')
      }
      if (post.postImages) {
        await deleteImageQuery(postId)
      }
      imagesUrl.forEach(async (imageUrl: string) => {
        const addedImage = addImageQuery(await validateAddImage({ postId, imageUrl }))
        updatedImages.push(await addedImage)
      })
    } else {
      post.postImages?.forEach((image: IPostImage) => {
        updatedImages.push(image)
      })
    }
    // it will be edited
    if (categoryId === 1) { // should be : category.title === "Adoption"
      const validatedPet = await addPetValidation({
        petName,
        type,
        age,
        gender,
        healthStatus,
        adoptionStatus,
        postId
      })
      updatedPet = await updatePetQuery(postId, validatedPet)
    } else if (categoryId === 4) { // should be : category.title === "Sell"
      const validatedProduct = await validateAddProduct({
        postId,
        title,
        price,
        details,
        rating
      })
      updatedProduct = await updateProductQuery(postId, validatedProduct)
    }
    res.status(200).json({
      message: 'Post updated successfully',
      data: {
        post: updatedPost,
        pet: updatedPet,
        product: updatedProduct,
        images: updatedImages.length !== 0 ? updatedImages : undefined
      }
    })
  } catch (err: unknown) {
    next(err)
  }
}
export default updatePost

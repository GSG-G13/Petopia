import { type Response, type NextFunction } from 'express'
import { type CustomRequest } from '../../interfaces/iAuth'
import {
  addPetValidation
  , validateAddImage
  , validateAddProduct
  , validateAddPost
} from '../../validation/post'
import { type IPost, type IPostImage } from '../../interfaces/fakeDataTypes'
import { addPostQuery } from '../../queries/post'
import addProductQuery from '../../queries/product/addProductQuery'
import addPetQuery from '../../queries/pet/addPetQuery'
import CustomError from '../../helpers/CustomError'
import addImageQuery from '../../queries/image/addImageQuery'
import { getAllCategoriesQuery } from '../../queries'
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
}
const addPost = async (req: CustomRequest, res: Response, next: NextFunction): Promise<void> => {
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
      adoptionStatus
    } = req.body as postData
    const postData: IPost = { userId, categoryId, postContent, isHaveImg }

    const categories = await getAllCategoriesQuery()
    const validatedPost = await validateAddPost(postData)
    const isCategory = categories.filter((category: ICategory) => category.categoryId === categoryId).length === 0
    if (isCategory) {
      throw new CustomError(400, 'Bad Request')
    }

    const postId = await addPostQuery(validatedPost)
    let addedPet
    let addedProduct
    const addedImages: IPostImage[] = []
    if (postId === null) {
      throw new CustomError(400, 'Can\'t add new post.')
    } else {
      if (isHaveImg) {
        if (imagesUrl === undefined || imagesUrl.length === 0) {
          throw new CustomError(400, 'Images is required.')
        }
        imagesUrl.forEach(async (imageUrl: string) => {
          const validatedImage = await validateAddImage({ postId, imageUrl })
          const addedImage = addImageQuery(validatedImage)
          addedImages.push(await addedImage)
        })
      }
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
        addedPet = await addPetQuery(validatedPet)
      } else if (categoryId === 4) { // should be : category.title === "Sell"
        const validatedProduct = await validateAddProduct({
          postId,
          title,
          price,
          details,
          rating
        })
        addedProduct = await addProductQuery(validatedProduct)
      }
      res.status(201).json({
        message: `Post created successfully with ID: ${postId}`,
        data: {
          post: postData,
          pet: addedPet,
          product: addedProduct,
          images: addedImages.length !== 0 ? addedImages : undefined
        }
      })
    }
  } catch (err: unknown) {
    next(err)
  }
}
export default addPost

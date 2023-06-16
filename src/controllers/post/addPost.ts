/* eslint-disable @typescript-eslint/naming-convention */
import { type Response, type NextFunction } from 'express'
import { type CustomRequest } from '../../interfaces/iAuth'
import {
  addPetValidation
  , validateAddImage
  , validateAddProduct
  , validateAddPost
} from '../../validation/post'
import { type IPost, type IPostImage } from '../../interfaces/fakeDataTypes'
import addPostQuery from '../../queries/post/addPostQuery'
import addProductQuery from '../../queries/product/addProductQuery'
import addPetQuery from '../../queries/pet/addPetQuery'
import CustomError from '../../helpers/CustomError'
import addImageQuery from '../../queries/image/addImageQuery'

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
    const validatedPost = await validateAddPost(postData)
    const postId = await addPostQuery(validatedPost)
    let addedPet
    let addedProduct
    const addedImages: IPostImage[] = []
    if (postId === null) {
      throw new CustomError(402, 'Can\'t add new post.')
    } else {
      if (isHaveImg) {
        imagesUrl.forEach(async (imageUrl: string) => {
          const validatedImage = await validateAddImage({ postId, imageUrl })
          const addedImage = addImageQuery(validatedImage)
          addedImages.push(await addedImage)
          if (addedImage === null) {
            throw new CustomError(402, 'Can\'t add new Image.')
          }
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
        addedPet = await addPetQuery(validatedPet)
        if (addedPet === null) {
          throw new CustomError(402, 'Can\'t add new pet.')
        }
      } else if (categoryId === 4) { // should be : category.title === "Sell"
        const validatedProduct = await validateAddProduct({
          postId,
          title,
          price,
          details,
          rating
        })
        addedProduct = await addProductQuery(validatedProduct)
        if (addedProduct === null) {
          throw new CustomError(402, 'Can\'t add new product.')
        }
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
export { addPost }

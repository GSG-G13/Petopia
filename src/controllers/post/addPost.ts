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
  category_id: number
  post_content: string
  is_have_img: boolean
  imagesUrl: string[]
  title: string
  price: number
  details: string
  rating: number
  pet_name: string
  pet_type: number
  age: number
  gender: string
  health_status: string
  adoption_status: string
}
const addPost = async (req: CustomRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = req.user?.userId as number
    const {
      category_id,
      post_content,
      is_have_img,
      imagesUrl,
      title,
      price,
      details,
      rating,
      pet_name,
      pet_type,
      age,
      gender,
      health_status,
      adoption_status
    } = req.body as postData
    const postData: IPost = { userId, category_id, post_content, is_have_img }
    const validatedPost = await validateAddPost(postData)
    const post_id = await addPostQuery(validatedPost)
    let addedPet
    let addedProduct
    const addedImages: IPostImage[] = []
    if (post_id === null) {
      throw new CustomError(402, 'Can\'t add new post.')
    } else {
      if (is_have_img) {
        imagesUrl.forEach(async (image_url: string) => {
          const validatedImage = await validateAddImage({ post_id, image_url })
          const addedImage = addImageQuery(validatedImage)
          addedImages.push(await addedImage)
          if (addedImage === null) {
            throw new CustomError(402, 'Can\'t add new Image.')
          }
        })
      }
      // it will be edited
      if (category_id === 1) { // should be : category.title === "Adoption"
        const validatedPet = await addPetValidation({
          pet_name,
          pet_type,
          age,
          gender,
          health_status,
          adoption_status,
          post_id
        })
        addedPet = await addPetQuery(validatedPet)
        if (addedPet === null) {
          throw new CustomError(402, 'Can\'t add new pet.')
        }
      } else if (category_id === 4) { // should be : category.title === "Sell"
        const validatedProduct = await validateAddProduct({
          post_id,
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
        message: `Post created successfully with ID: ${post_id}`,
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

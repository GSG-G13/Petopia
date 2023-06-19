import {
  addCategoryQuery, deleteCategoryQuery, editCategoryQuery,
  getAllCategoriesQuery, getSpecificCategoryQuery
} from './category'

import {
  updateCommentQuery, getCommentsQuery,
  getCommentQuery, deleteCommentQuery, addCommentQuery
} from './comment'

import { getUserQuery } from './user'
import { createLikeQuery, unLikeQuery, getPostLikersQuery } from './likes'

import { loginQuery, createUser } from './auth'

import {
  createPetTypeQuery, deletePetTypeQuery, editPetTypeQuery,
  getAllPetTypesQuery, getPetTypeByIdQuery
} from './petType'

export {
  addCategoryQuery, deleteCategoryQuery, editCategoryQuery,
  getAllCategoriesQuery, getSpecificCategoryQuery,

  updateCommentQuery, getCommentsQuery,
  getCommentQuery, deleteCommentQuery, addCommentQuery,
  createLikeQuery, unLikeQuery, getPostLikersQuery,
  getUserQuery,

  loginQuery, createUser,

  createPetTypeQuery, deletePetTypeQuery, editPetTypeQuery, getAllPetTypesQuery, getPetTypeByIdQuery
}

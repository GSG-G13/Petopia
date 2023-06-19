import {
  addCategoryQuery, deleteCategoryQuery, editCategoryQuery,
  getAllCategoriesQuery, getSpecificCategoryQuery
} from './category'

import {
  updateCommentQuery, getCommentsQuery,
  getCommentQuery, deleteCommentQuery, addCommentQuery
} from './comment'

import { createLikeQuery, unLikeQuery, getPostLikersQuery } from './likes'
import { getUserQuery, getAllUsersQuery } from './user'

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

  getUserQuery, getAllUsersQuery,

  loginQuery, createUser,

  createPetTypeQuery, deletePetTypeQuery, editPetTypeQuery, getAllPetTypesQuery, getPetTypeByIdQuery
}

import {
  getPostQuery, addPostQuery, deletePostQuery,
  updatePostQuery, getExplorePostsQuery, getFeedPostsQuery
} from './post'

import { addProductQuery, updateProductQuery } from './product'

import { addPetQuery, updatePetQuery } from './pet'

import { addImageQuery, deleteImageQuery } from './image'

import {
  addCategoryQuery, deleteCategoryQuery, editCategoryQuery,
  getAllCategoriesQuery, getSpecificCategoryQuery
} from './category'

import {
  updateCommentQuery, getCommentsQuery,
  getCommentQuery, deleteCommentQuery, addCommentQuery
} from './comment'

import { createLikeQuery, unLikeQuery, getPostLikersQuery } from './likes'
import { getUserQuery, getAllUsersQuery, userStatusQuery } from './user'

import { loginQuery, createUser } from './auth'

import {
  createPetTypeQuery, deletePetTypeQuery, editPetTypeQuery,
  getAllPetTypesQuery, getPetTypeByIdQuery
} from './petType'

export {
  getPostQuery, addPostQuery,
  deletePostQuery, updatePostQuery,
  getExplorePostsQuery, getFeedPostsQuery,

  addProductQuery, updateProductQuery,

  addPetQuery, updatePetQuery,

  addImageQuery, deleteImageQuery,

  addCategoryQuery, deleteCategoryQuery, editCategoryQuery,
  getAllCategoriesQuery, getSpecificCategoryQuery,

  updateCommentQuery, getCommentsQuery,
  getCommentQuery, deleteCommentQuery, addCommentQuery,
  createLikeQuery, unLikeQuery, getPostLikersQuery,

  getUserQuery, getAllUsersQuery, userStatusQuery,

  loginQuery, createUser,

  createPetTypeQuery, deletePetTypeQuery, editPetTypeQuery, getAllPetTypesQuery, getPetTypeByIdQuery
}

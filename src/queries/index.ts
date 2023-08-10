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
import { getUserQuery, getAllUsersQuery, userStatusQuery, searchAboutUserQuery } from './user'

import { loginQuery, createUser } from './auth'

import {
  createPetTypeQuery, deletePetTypeQuery, editPetTypeQuery,
  getAllPetTypesQuery, getPetTypeByIdQuery
} from './petType'

import { getBookmarksQuery, addBookmarksQuery, deleteBookmarksQuery, getBookmarkersQuery } from './bookmarks'

import getStatsQuery from './stats'
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

  getUserQuery, getAllUsersQuery, userStatusQuery, searchAboutUserQuery,

  loginQuery, createUser,

  createPetTypeQuery, deletePetTypeQuery, editPetTypeQuery, getAllPetTypesQuery, getPetTypeByIdQuery,
  getStatsQuery,

  getBookmarksQuery, addBookmarksQuery, deleteBookmarksQuery, getBookmarkersQuery
}

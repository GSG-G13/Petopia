import {
  addCategoryQuery, deleteCategoryQuery, editCategoryQuery,
  getAllCategoriesQuery, getSpecificCategoryQuery
} from './category'

import {
  updateCommentQuery, getCommentsQuery,
  getCommentQuery, deleteCommentQuery, addCommentQuery
} from './comment'

import { getUserQuery, getAllUsersQuery } from './user'

import { loginQuery, createUser } from './auth'

export {
  addCategoryQuery, deleteCategoryQuery, editCategoryQuery,
  getAllCategoriesQuery, getSpecificCategoryQuery,

  updateCommentQuery, getCommentsQuery,
  getCommentQuery, deleteCommentQuery, addCommentQuery,

  getUserQuery, getAllUsersQuery,

  loginQuery, createUser
}

import { addComment, deleteComment, getSpecificComment, getComments, updateComment } from './comment'
import { createCategory, deleteCategory, updateCategory, showAllCategories, showCategoryById } from './category'
import { signup, login, logout } from './auth'
import { getUser, getAllUsers, updateUser } from './user'
import { createPetType, deletePetType, editPetType, getAllPetTypes, getPetTypeById } from './petType'

export {
  addComment, deleteComment, getSpecificComment, getComments, updateComment,
  createCategory, deleteCategory, updateCategory, showAllCategories, showCategoryById,
  signup, login, logout,
  getUser, getAllUsers, updateUser,
  createPetType, deletePetType, editPetType, getAllPetTypes, getPetTypeById
}

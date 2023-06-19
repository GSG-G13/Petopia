import { addComment, deleteComment, getSpecificComment, getComments, updateComment } from './comment'
import { createCategory, deleteCategory, updateCategory, showAllCategories, showCategoryById } from './category'
import { signup, login, logout } from './auth'
import { getUser } from './user'
import { createPetType, deletePetType, editPetType, getAllPetTypes, getPetTypeById } from './petType'

export {
  addComment, deleteComment, getSpecificComment, getComments, updateComment,
  createCategory, deleteCategory, updateCategory, showAllCategories, showCategoryById,
  signup, login, logout,
  getUser,
  createPetType, deletePetType, editPetType, getAllPetTypes, getPetTypeById
}

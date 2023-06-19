import express from 'express'
import {
  createPetType, deletePetType, editPetType, getAllPetTypes, getPetTypeById
} from '../controllers/'

const typeRouter = express.Router()

typeRouter.post('/', createPetType)
typeRouter.put('/:typeId', editPetType)
typeRouter.delete('/:typeId', deletePetType)
typeRouter.get('/', getAllPetTypes)
typeRouter.get('/:typeId', getPetTypeById)

export default typeRouter

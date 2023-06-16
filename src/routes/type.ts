import express from 'express'
import {
  createType,
  deleteType, updateType,
  showAllTypes, showTypeById
} from '../controllers/pettype'

const typeRouter = express.Router()

typeRouter.post('/', createType)
typeRouter.put('/:typeId', updateType)
typeRouter.delete('/:typeId', deleteType)
typeRouter.get('/', showAllTypes)
typeRouter.get('/:typeId', showTypeById)

export default typeRouter

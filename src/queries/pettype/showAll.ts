import PetType from '../../models/PetType'
import { type IPetType } from '../../interfaces/models'

const getAllTypes = async (): Promise<IPetType[]> => {
  const petTipes = await PetType.findAll()

  return petTipes
}

export { getAllTypes }

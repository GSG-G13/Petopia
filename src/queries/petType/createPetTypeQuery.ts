import PetType from '../../models/PetType'
import { type IPetType } from '../../interfaces/models'

const createPetTypeQuery = async (title: string): Promise<IPetType> => {
  const newPetType = await PetType.create({ title })
  return newPetType
}

export default createPetTypeQuery

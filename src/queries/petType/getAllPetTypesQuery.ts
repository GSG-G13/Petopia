import PetType from '../../models/PetType'
import { type IPetType } from '../../interfaces/models'

const getAllPetTypesQuery = async (): Promise<IPetType[]> => {
  const result = await PetType.findAll()

  return result
}

export default getAllPetTypesQuery

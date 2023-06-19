import PetType from '../../models/PetType'
import { type IPetType } from '../../interfaces/models'

const getPetTypeByIdQuery = async (typeId: number): Promise<IPetType | null> => {
  const result = await PetType.findByPk(typeId)

  return result
}

export default getPetTypeByIdQuery

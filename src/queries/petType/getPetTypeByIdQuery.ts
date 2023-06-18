import PetType from '../../models/PetType'
import { type IPetType } from '../../interfaces/models'

const getPetTypeByIdQuery = async (typeId: number): Promise<IPetType | null> => {
  const type = await PetType.findByPk(typeId)

  return type
}

export default getPetTypeByIdQuery

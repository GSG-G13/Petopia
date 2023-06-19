import PetType from '../../models/PetType'
import { type IPetType } from '../../interfaces/models'
const editPetTypeQuery = async (typeId: number, title: string):
Promise<[affectedCount: number, affectedRows: IPetType[]]> => {
  const result = await PetType.update({ title }, { where: { typeId }, returning: true })
  return result
}
export default editPetTypeQuery

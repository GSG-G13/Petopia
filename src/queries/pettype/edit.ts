import PetType from '../../models/PetType'
import { type IPetType } from '../../interfaces/models'

const editPetType = async (typeId: number, title: string): Promise<IPetType | null> => {
  const type = await PetType.findByPk(typeId)

  if (type != null) {
    type.title = title
    await type.save()

    return type
  }

  return null
}

export { editPetType }

import { type IPet } from '../../interfaces/fakeDataTypes'
import { Pet } from '../../models'

const updatePetQuery = async (postId: number, petData: IPet): Promise<IPet> => {
  const [, [updatedPet]] = await Pet.update(
    petData,
    {
      where: { postId },
      returning: true
    }
  )
  return updatedPet
}
export default updatePetQuery

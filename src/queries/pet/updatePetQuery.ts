import { type IPet } from '../../interfaces/fakeDataTypes'
import { Pet } from '../../models'

const updatePetQuery = async (postId: number, petData: IPet): Promise<IPet | null> => {
  const [count, [updatedPet]] = await Pet.update(
    { ...petData },
    {
      where: { postId },
      returning: true
    }
  )
  if (count === 0) {
    return null
  }
  return updatedPet
}
export default updatePetQuery

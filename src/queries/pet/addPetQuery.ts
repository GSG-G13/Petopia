import { type IPet } from '../../interfaces/fakeDataTypes'
import { Pet } from '../../models'

const addPetQuery = async (petData: IPet): Promise<IPet> => {
  const pet = await Pet.create(
    { ...petData }
  )
  return pet
}
export default addPetQuery

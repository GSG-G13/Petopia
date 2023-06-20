import CustomError from '../../helpers/CustomError'
import { type IPet } from '../../interfaces/fakeDataTypes'
import { Pet } from '../../models'

const addPetQuery = async (petData: IPet): Promise<IPet> => {
  try {
    const pet = await Pet.create(
      { ...petData }
    )
    return pet
  } catch (err) {
    throw new CustomError(400, 'Bad Request')
  }
}
export default addPetQuery

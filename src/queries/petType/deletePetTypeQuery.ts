import PetType from '../../models/PetType'

const deletePetTypeQuery = async (typeId: number): Promise<boolean> => {
  const deletedPetType = await PetType.destroy({ where: { typeId } })

  return deletedPetType > 0
}

export default deletePetTypeQuery

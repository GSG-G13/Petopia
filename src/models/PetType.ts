import { Model, DataTypes } from 'sequelize'
import sequelize from '../database/config'

class PetType extends Model {
  public type_id!: number
  public title!: string
}

PetType.init(
  {
    type_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      type: DataTypes.STRING
    }
  },
  {
    sequelize,
    modelName: 'PetType',
    tableName: 'pet_types'
  }
)

export default PetType

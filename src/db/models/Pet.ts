import { Model, DataTypes } from 'sequelize'
import sequelize from '../config'

class Pet extends Model {
  public pet_id!: number
  public post_id!: number
  public pet_name!: string
  public pet_type!: number
  public age!: number
  public gender!: string
  public health_status!: string
  public adoption_status!: string
}

Pet.init(
  {
    pet_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    post_id: {
      type: DataTypes.INTEGER
    },
    pet_name: {
      type: DataTypes.STRING
    },
    pet_type: {
      type: DataTypes.INTEGER
    },
    age: {
      type: DataTypes.INTEGER
    },
    gender: {
      type: DataTypes.STRING
    },
    health_status: {
      type: DataTypes.STRING
    },
    adoption_status: {
      type: DataTypes.STRING
    }
  },
  {
    sequelize,
    modelName: 'Pet',
    tableName: 'pets'
  }
)

export default Pet

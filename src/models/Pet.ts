import sequelize from '../database/config'
import { DataTypes } from 'sequelize'
import { type IPet } from '../interfaces/models'

const Pet = sequelize.define<IPet>('pet', {
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
})

export default Pet

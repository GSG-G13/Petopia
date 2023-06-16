import sequelize from '../database/config'
import { DataTypes } from 'sequelize'
import { type IPet } from '../interfaces/models'

const Pet = sequelize.define<IPet>('pet', {
  petId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  postId: {
    type: DataTypes.INTEGER
  },
  petName: {
    type: DataTypes.STRING
  },
  petType: {
    type: DataTypes.INTEGER
  },
  age: {
    type: DataTypes.INTEGER
  },
  gender: {
    type: DataTypes.STRING
  },
  healthStatus: {
    type: DataTypes.STRING
  },
  adoptionStatus: {
    type: DataTypes.STRING
  }
})

export default Pet

import sequelize from '../database/config'
import { DataTypes } from 'sequelize'
import { type IPetType } from '../interfaces/models'

const PetType = sequelize.define<IPetType>('petType', {
  typeId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  title: {
    type: DataTypes.STRING
  }
})

export default PetType

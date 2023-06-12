import sequelize from '../database/config'
import { DataTypes } from 'sequelize'
import { type ICategory } from '../interfaces/models'

const Category = sequelize.define<ICategory>('category', {
  category_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  title: {
    type: DataTypes.STRING
  }
})

export default Category

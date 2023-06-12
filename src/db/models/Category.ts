import { Model, DataTypes } from 'sequelize'
import sequelize from '../config'

class Category extends Model {
  public category_id!: number
  public title!: string
}

Category.init(
  {
    category_id: {
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
    modelName: 'Category',
    tableName: 'categories'
  }
)

export default Category

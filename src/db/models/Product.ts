import { Model, DataTypes } from 'sequelize'
import sequelize from '../config'

class Product extends Model {
  public product_id!: number
  public post_id!: number
  public title!: string
  public price!: number
  public details!: string
  public rating!: number
}

Product.init(
  {
    product_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    post_id: {
      type: DataTypes.INTEGER
    },
    title: {
      type: DataTypes.STRING
    },
    price: {
      type: DataTypes.FLOAT
    },
    details: {
      type: DataTypes.STRING
    },
    rating: {
      type: DataTypes.FLOAT
    }
  },
  {
    sequelize,
    modelName: 'Product',
    tableName: 'products'
  }
)

export default Product

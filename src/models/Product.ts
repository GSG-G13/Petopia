import sequelize from '../database/config'
import { DataTypes } from 'sequelize'
import { type IProduct } from '../interfaces/models'

const Product = sequelize.define<IProduct>('product', {
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
})

export default Product

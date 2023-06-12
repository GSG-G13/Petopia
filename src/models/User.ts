import sequelize from '../database/config'
import { DataTypes } from 'sequelize'
import { type IUser } from '../interfaces/models'

const User = sequelize.define<IUser>('user', {
  user_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  full_name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  user_image: {
    type: DataTypes.STRING
  },
  profile_image: {
    type: DataTypes.STRING
  },
  address: {
    type: DataTypes.STRING
  },
  phone: {
    type: DataTypes.STRING
  },
  user_type: {
    type: DataTypes.STRING,
    defaultValue: 'regular',
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM('active', 'deactive'),
    allowNull: false
  }
})

export default User

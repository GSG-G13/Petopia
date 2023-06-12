import { Model, DataTypes } from 'sequelize'
import sequelize from '../config'

class User extends Model {
  public user_id!: number
  public full_name!: string
  public email!: string
  public password!: string
  public user_image!: string
  public profile_image!: string
  public address!: string
  public phone!: string
  public user_type!: string
  public status!: string
}

User.init(
  {
    user_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    full_name: {
      type: DataTypes.STRING
    },
    email: {
      type: DataTypes.STRING
    },
    password: {
      type: DataTypes.STRING
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
      type: DataTypes.STRING
    },
    status: {
      type: DataTypes.STRING
    }
  },
  {
    sequelize,
    modelName: 'User',
    tableName: 'users'
  }
)

export default User

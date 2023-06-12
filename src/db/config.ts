import { Sequelize } from 'sequelize'
import dotenv from 'dotenv'

dotenv.config()

const { NODE_ENV, DEV_DB_URL, TEST_DB_URL, DATABASE_URL } = process.env

let url: string
let ssl: boolean | { rejectUnauthorized: boolean } = false

switch (NODE_ENV) {
  case 'production':
    url = DATABASE_URL as string
    ssl = { rejectUnauthorized: false }
    break
  case 'development':
    url = DEV_DB_URL as string
    break
  case 'test':
    url = TEST_DB_URL as string
    break
  default:
    throw new Error('invalid database url')
}

const sequelize = new Sequelize(url, { logging: false, dialect: 'postgres', dialectOptions: { ssl } })
export default sequelize

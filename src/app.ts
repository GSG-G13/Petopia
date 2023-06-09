import express from 'express'
import compression from 'compression'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'
import router from './routes'

dotenv.config()
const app = express()
app.disabled('x-powered-by')
app.set('port', process.env.PORT ?? 3000)
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(compression())
app.use(cookieParser())
app.use(router)
export default app

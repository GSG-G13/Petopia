import express from 'express'
import compression from 'compression'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'
import { join } from 'path'
import router from './routes'
import serverError from './helpers/serverErrors'
import cors from 'cors'

dotenv.config()
const { NODE_ENV, PORT } = process.env
const app = express()

app.disable('x-powered-by')

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(compression())
app.use(cookieParser())
app.use(cors())

app.use('/api/v1', router)

app.set('port', PORT ?? 3000)

if (NODE_ENV === 'production') {
  app.use(express.static(join(__dirname, '..', 'client', 'build')))
  app.get('/*', (_req, res) => {
    res.sendFile(join(__dirname, '..', 'client', 'dist', 'index.html'))
  })
}
app.use(serverError)
export default app

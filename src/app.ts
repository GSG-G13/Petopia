import express from 'express'
import compression from 'compression'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'
import { join } from 'path'
import router from './routes'

dotenv.config()
const { NODE_ENV, PORT } = process.env
const app = express()

app.disabled('x-powered-by')

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(compression())
app.use(cookieParser())

app.use('/api/v1', router)

if (NODE_ENV === 'production') {
  app.use(express.static(join(__dirname, '..', 'client', 'build')))
  app.get('/*', (_req, res) => {
    res.sendFile(join(__dirname, '..', 'client', 'build', 'index.html'))
  })
}

app.set('port', PORT ?? 3000)

export default app

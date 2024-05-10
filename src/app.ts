import express from 'express'
import mongoose from 'mongoose'
import {
  logErrors,
  errorHandler,
  boomErrorHandler
} from './middlewares/error.handler'
import routerApi from './routes'
import { config } from './config/config'
import passport from 'passport'
import cors from 'cors'
import './utils/auth'

const { mongoUri, port } = config

const app = express()

app.use(express.json())
app.use(cors())

const connectDB = () => {
  mongoose.connect(mongoUri)
}

routerApi(app)

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`)
  connectDB()
})

app.use(logErrors)
app.use(boomErrorHandler)
app.use(errorHandler)

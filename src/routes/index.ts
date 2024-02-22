import express from 'express'
import CategoryRouter from './category.route'
import TaskRouter from './task.route'

const routerApi = (app) => {
  const router = express.Router()
  app.use('/api/v1', router)
  router.use('/categories', CategoryRouter)

  router.use('/tasks', TaskRouter)

}

export default routerApi

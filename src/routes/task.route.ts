import express from 'express'
import { Tasks } from '../types/task.type'

import TaskService from '../services/task.service'

const router = express.Router()
const service = new TaskService()

router.post('/', async (req, res) => {
    try {
        const taskData: Tasks = req.body;
        const newTask = await service.create(taskData)

        res.status(201).json(newTask);

    } catch (error) {
        res.status(400).json({ error: error.message });
    }
})

router.get('/', async (req, res, next) => {
    try {
        const tasks = await service.findAll()
        res.status(200).json(tasks)
    } catch (error) {
        next(error)
    }
})

router.get('/findById/:id', async (req, res, next) => {
    try {
      const task = await service.findById(req.params.id)
      res.status(200).json(task)
    } catch (error) {
      next(error)
    }
})
  
router.get('/findByName', async (req, res, next) => {
    try {
      const task = await service.findByName(req.query.name as string)
      res.status(200).json(task)
    } catch (error) {
      next(error)
    }
})

export default router
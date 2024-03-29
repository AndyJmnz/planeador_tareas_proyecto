import express from 'express'
import { Tasks } from '../types/task.type'
import TaskService from '../services/task.service'

import { JwtRequestType } from '../types/user.type'
import { ObjectId } from 'mongoose'

import passport from 'passport'
import { UserRequestType } from '../types/user.type'

const router = express.Router()
const service = new TaskService()

router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  async (req: JwtRequestType, res) => {
    try {
      const {
        user: { sub }
      } = req
      console.log('sub', sub)
      const taskData: Tasks = req.body;
      const newTask = await service.create(
        taskData,
        sub as unknown as ObjectId
      )

      res.status(201).json(newTask);

    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
)

router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  async (req: JwtRequestType, res, next) => {
    try {
      const { user } = req
      const tasks = await service.findAll()
      res.status(200).json(tasks)
    } catch (error) {
      next(error)
    }
  }
)

router.get(
  '/findById/:id',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    try {
      const task = await service.findById(req.params.id)
      res.status(200).json(task)
    } catch (error) {
      next(error)
    }
  }
)

router.get(
  '/findByName',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    try {
      const task = await service.findByName(req.query.name as string)
      res.status(200).json(task)
    } catch (error) {
      next(error)
    }
  }
)

//Routa buscar por usuario
router.get(
  '/findByUser',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    try {
      const tasks = await service.findByUser(req.query.user as string);
      res.status(200).json(tasks);
    } catch (error) {
      next(error); 
    }
  }
)

//ruta buscar por status
router.get(
  '/findByStatus',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    try {
      const tasks = await service.findByStatus(req.query.status as string);
      res.status(200).json(tasks);
    } catch (error) {
      next(error); 
    }
  }
)

export default router
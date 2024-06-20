import express from 'express'
import { Tasks } from '../types/task.type'
import TaskService from '../services/task.service'

import { JwtRequestType } from '../types/user.type'
import { ObjectId } from 'mongoose'

import passport from 'passport'
import { UserRequestType } from '../types/user.type'

const router = express.Router()
const service = new TaskService()

router.get(
  "/findSecond",
  async(req,res,next) => {
    try {
      const category = await service.findSecond()
      res.status(200).json(category)
    } catch (error) {
      next(error)
    }
  }
)

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

router.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    try {
      const taskId = req.params.id;
      await service.deleteTask(taskId);
      res.status(204).send(); // 204 No Content
    } catch (error) {
      next(error);
    }
  }
)

// Nueva ruta para actualizar una tarea por ID
router.put(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    try {
      const taskId = req.params.id;
      const { name, description } = req.body;
      const updatedTask = await service.updateTask(taskId, { name, description });
      res.status(200).json(updatedTask);
    } catch (error) {
      next(error);
    }
  }
)

router.patch(
  '/:id/status',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    try {
      const taskId = req.params.id;
      const updatedTask = await service.updateTaskStatus(taskId, "Completado");
      res.status(200).json(updatedTask);
    } catch (error) {
      next(error);
    }
  }
)

export default router

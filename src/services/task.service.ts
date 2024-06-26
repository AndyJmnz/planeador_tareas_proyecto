import { ObjectId } from 'mongoose'
import Task from '../models/task.models'
import { Tasks, TasksModel } from '../types/task.type'
import boom from '@hapi/boom'

class TaskService {
    async create(task: Tasks, userId: ObjectId) {
        const newTask = await Task.create({
            ...task,
            user: userId
        }).catch((error) => {
            console.log('Could not save task', error)
        })

        const existingTask = await this.findById((newTask as any)._id)

        return existingTask.populate([{ path: 'user', strictPopulate: false }])
    }

    async findAll() {
        const task = await Task.find()
            .populate([{ path: 'user', strictPopulate: false }])
            .catch((error) => {
                console.log('Error while connecting to the DB', error)
            })
        if (!task) {
            throw boom.notFound('There are not tasks')
        }
        return task
    }

    async findById(id: string) {
        const task = await Task.findById(id).catch((error) => {
            console.log('Error while connecting to the DB', error)
        })
        if (!task) {
            throw boom.notFound('Category not found')
        }
        return task
    }

    async findByName(name: string) {
        const task = await Task.findOne({ name }).catch((error) => {
            console.log('Error while connecting to the DB', error)
        })

        if (!task) {
            throw boom.notFound('Task not found')
        }
        return task
    }

    //Buscar tareas por usuario
    async findByUser(user: string) {
        try {
            const tasks = await Task.find({ user });
            if (!tasks || tasks.length === 0) {
                throw new Error('Task not found');
            }
            return tasks;
        } catch (error) {
            console.log('Error while finding tasks:', error);
            throw new Error('Error finding tasks');
        }
    }

    async findByStatus(status: string) {
        try {
            const tasks = await Task.find({ status });
            if (!tasks || tasks.length === 0) {
                throw new Error('Task not found');
            }
            return tasks;
        } catch (error) {
            console.log('Error while finding tasks:', error);
            throw new Error('Error finding tasks');
        }
    }

    async findSecond() {
        const task = await Task.find().catch((error) => {
            console.log('Error while connecting to the DB', error)
        })
        if (!task) {
            throw boom.notFound('Task not found')
        }
        return task[1]
    }

    async deleteTask(id: string) {
        const task = await Task.findByIdAndDelete(id).catch((error) => {
            console.log('Error while connecting to the DB', error)
        })
        if (!task) {
            throw boom.notFound('Task not found')
        }
        return task
    }

    async updateTask(id: string, taskData: Partial<Tasks>) {
        const task = await Task.findByIdAndUpdate(id, { $set: taskData }, { new: true }).catch((error) => {
            console.log('Error while connecting to the DB', error)
        })
        if (!task) {
            throw boom.notFound('Task not found')
        }
        return task
    }

    async updateTaskStatus(taskId: string, status: string) {
        const updatedTask = await Task.findByIdAndUpdate(
            taskId,
            { status },
            { new: true } // Para devolver el documento actualizado
        ).catch((error) => {
            console.log('Error while updating task status', error);
            throw boom.internal('Internal server error');
        });

        if (!updatedTask) {
            throw boom.notFound('Task not found');
        }

        return updatedTask;
    }
}

export default TaskService

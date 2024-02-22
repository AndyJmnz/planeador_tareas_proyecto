import Task from '../models/task.models'
import { Tasks, TasksModel } from '../types/task.type'
import boom from '@hapi/boom'

class TaskService {
    async create(task: Tasks) {
        const newTask = await Task.create(task).catch((error) => {
            console.log('Could not save task', error)
        })
        return newTask
    }

    async findAll() {
        const task = await Task.find().catch((error) => {
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
}

export default TaskService
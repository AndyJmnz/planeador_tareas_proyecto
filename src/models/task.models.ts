import { Schema, model } from 'mongoose';
import { Tasks, TasksModel } from '../types/task.type';
import { USER_REFERENCE } from './user.model';

export const TASK_REFERENCE = 'Task'

const TaskSchema = new Schema<Tasks, TasksModel>({
  date: {
    type: Date,
    required: true
  },
  name: {
    type: String,
    required: true,
    unique:true,  //que no se repita el dato 
    index: true, //para buscar rapido
    trim: true
  },
  description: {
    type: String,
    trim: true,
    required:true
  },
  status:{
    type: String,
    index:true,
    default: "Not done",
    trim:true
  },
  user:{
    type: Schema.Types.ObjectId,
    ref:USER_REFERENCE
  }
});

//se exporta para la coleccion de Tasks 
export default model('Task', TaskSchema);

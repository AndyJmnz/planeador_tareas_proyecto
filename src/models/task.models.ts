import { Schema, model } from 'mongoose';
import { Tasks, TasksModel } from '../types/task.type';

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
    trim: true
  },
  status:{
    type: String,
    index:true,
    default: "Not done",
    trim:true
  }
});

//se exporta para la coleccion de Tasks 
export default model('Task', TaskSchema);

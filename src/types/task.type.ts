import { Model } from 'mongoose';


//Defino los datos que tendra Task
export interface Tasks {
  date: Date;
  name: string;
  description: string;
  status:string;
}

//un "modelo" representa un conjunto de operaciones que se pueden realizar en una colección de la base de datos.
export type TasksModel = Model<Tasks>;

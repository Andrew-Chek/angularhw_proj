import { Board } from "./Board";
import { Task } from "./Task";

export interface BoardsObject{
    boards: Board[];
    message: string;
  }
  
  export interface TasksObject{
    tasks: Task[];
    message: string;
  }
  
  export interface TaskObject{
    task: Task;
    message: string;
  }
  
  export interface BoardObject{
    board: Board;
    message: string;
  }
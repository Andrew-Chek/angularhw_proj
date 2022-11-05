import { Injectable } from '@angular/core';
import { catchError, mergeMap, of } from 'rxjs';
import { Task } from 'src/app/Task';
import { Board } from 'src/app/Board';
import { TaskObject, TasksObject } from '../../../../admin.service';
import { HttpClient } from '@angular/common/http';
import { Message } from 'src/app/Message';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  private apiUrl:string = 'https://n-npb6.onrender.com/api';
  public board:Board = {_id:'', name: '', description: '', created_date: ''};
  constructor(private http:HttpClient) {
  }

  getTasks(board_id:string) {
    return this.http.get<TasksObject>(
      `${this.apiUrl}/tasks/${board_id}`,
      {
        headers: {'Authorization': `Bearer ${window.localStorage.getItem('jwt_token')}`},
      }).pipe(
        mergeMap(tasksObj => {
          return of(tasksObj.tasks);
        }),
        catchError(error => {throw new Error(error.message)})
      )
  }

  getTask(id: string)
  {
    return this.http.get<TaskObject>(
      `${this.apiUrl}/tasks/single/${id}`,
      {
        headers: {'Authorization': `Bearer ${window.localStorage.getItem('jwt_token')}`}
    }).pipe(mergeMap((taskObj) => {return of(taskObj.task)}))
  }

  createTask(task:Task)
  {
    return this.http.post<Message>(
      `${this.apiUrl}/tasks/`,
      {name: task.name, description: task.description, status: task.status, board_id: task.board_id},
      {
        headers: {'Authorization': `Bearer ${window.localStorage.getItem('jwt_token')}`},
    })
  }

  updateTask(task:Task)
  {
    return this.http.put<Task>(
      `${this.apiUrl}/tasks/${task._id}`, 
      {name: task.name, description: task.description, status: task.status, isArchived: task.isArchived, comments: task.comments},
      {
        headers: {'Authorization': `Bearer ${window.localStorage.getItem('jwt_token')}`},
    })
  }

  deleteTask(id: string)
  {
    return this.http.delete<Task>(
      `${this.apiUrl}/tasks/${id}`,
      {
        headers: {'Authorization': `Bearer ${window.localStorage.getItem('jwt_token')}`},
    })
  }
}
import { Injectable } from '@angular/core';
import { catchError, mergeMap, of } from 'rxjs';
import { Task } from 'src/app/shared/interfaces/Task';
import { Board } from 'src/app/shared/interfaces/Board';
import { TaskObject, TasksObject } from 'src/app/shared/interfaces/apiInterfaces';
import { HttpClient } from '@angular/common/http';
import { Message } from 'src/app/shared/interfaces/Message';
import { Router } from '@angular/router';
import { Comment } from 'src/app/shared/interfaces/Comment';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  private apiUrl:string = 'https://n-npb6.onrender.com/api';
  public board:Board = {_id:'', name: '', description: '', created_date: ''};
  constructor(private http:HttpClient, private router: Router) {
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
        catchError(error => {
          this.router.navigateByUrl('notfound')
          return of(error.message)
        })
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

  createComment(comment: Comment, id: string)
  {
    return this.http.patch<Message>(
      `${this.apiUrl}/tasks/${id}`,
      {title: comment.title, message: comment.message, created_date: comment.created_date},
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
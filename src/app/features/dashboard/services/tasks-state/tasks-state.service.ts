import { Injectable } from '@angular/core';
import { Observable, map, mergeMap, take, concatMap } from 'rxjs';
import { Board } from 'src/app/shared/interfaces/Board';
import { Store } from 'src/app/shared/interfaces/Store';
import { Task } from 'src/app/shared/interfaces/Task';
import { TasksState } from 'src/app/shared/interfaces/tasksState';
import { TasksService } from '../../components/tasks/services/tasksService/tasks.service';
import { BoardsStateService } from '../boards-state/boards-state.service';

@Injectable({
  providedIn: 'root'
})
export class TasksStateService extends Store<TasksState> {

  constructor(private taskApi: TasksService, private boardsStateService: BoardsStateService ) {
    super({
      tasks: [],
      task: {_id: '', name: '', description: '', status: '', board_id: '', assigned_to: '', comments: [], isArchived: false, created_date: ''}
    })
  }

  public readonly tasks$: Observable<Task[]> = this.state$.pipe(map(x => {return x.tasks}));
  public readonly task$: Observable<Task> = this.state$.pipe(map(x => {return x.task}));
  public readonly board$: Observable<Board | undefined> = this.boardsStateService.state$.pipe(map(x => {return x.board}))

  getTasks(board_id:string) {
    this.taskApi.getTasks(board_id).subscribe((value => {
      this.setState({
        ...this.state,
        tasks: value
      });
    }))
    return this.tasks$;
  }

  getTask(id: string)
  {
    this.taskApi.getTask(id)
    .subscribe((value => {
      this.setState({
        ...this.state,
        task: value
      });
    }))
    return this.task$
  }

  getTaskValue(id: string)
  {
    return this.taskApi.getTask(id)
  }

  createTask(task:Task)
  {
    let board_id = ''
    this.taskApi.createTask(task).pipe(
      concatMap((value) => {
        return this.board$
      }),
      mergeMap(value => {
        if(value != undefined)
        {
          return this.taskApi.getTasks(value._id)
        }
        return this.taskApi.getTasks(board_id)
      }),
      take(1)
    ).subscribe(value => {
      this.setState({
        ...this.state,
        tasks: value
      });
    })
  }

  updateTask(task:Task)
  {
    let board_id = ''
    this.taskApi.updateTask(task).pipe(
      concatMap((value) => {
        return this.board$
      }),
      concatMap(value => {
        if(value != undefined)
        {
          return this.taskApi.getTasks(value._id)
        }
        return this.taskApi.getTasks(board_id)
      }),
      take(1)
    ).subscribe(value => {
      this.setState({
        ...this.state,
        tasks: value
      });
    })
  }

  deleteTask(task: Task)
  {
    let board_id = ''
    this.taskApi.deleteTask(task._id).pipe(
      concatMap((value) => {
        return this.board$
      }),
      mergeMap(value => {
        if(value != undefined)
        {
          return this.taskApi.getTasks(value._id)
        }
        return this.taskApi.getTasks(board_id)
      }),
      take(1)
    ).subscribe(value => {
      this.setState({
        ...this.state,
        tasks: value
      });
    })
  }

  setCurrentTask(task: Task)
  {
    this.setState({
      ...this.state,
      task: task
    });
  }

  setCurrentTasks(tasks: Task[])
  {
    this.setState({
      ...this.state,
      tasks: tasks
    });
  }
}
import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable, map, BehaviorSubject, mergeMap, of, take, tap, concatMap } from 'rxjs';
import { Board } from 'src/app/Board';
import { Message } from 'src/app/Message';
import { DashboardState, Store } from 'src/app/Store';
import { Task } from 'src/app/Task';
import { BoardsService } from './components/boards/boards.service';
import { TasksService } from './components/tasks/tasks.service';

@Injectable({
  providedIn: 'root'
})
export class AdminService extends Store<DashboardState> {

  constructor(public boardApi: BoardsService, public taskApi: TasksService) {
    super({
      boards: [],
      tasks: [],
      board: {_id: '', name: '', description: '', created_date: ''},
      task: {_id: '', name: '', description: '', status: '', board_id: '', assigned_to: '', created_date: ''}
    })
  }

  public readonly boards$: Observable<Board[]> = this.state$.pipe(map(x => {return x.boards}));
  public readonly tasks$: Observable<Task[]> = this.state$.pipe(map(x => {return x.tasks}));
  public readonly board$: Observable<Board | undefined> = this.state$.pipe(map(x => {return x.board}));
  public readonly task$: Observable<Task> = this.state$.pipe(map(x => {return x.task}));

  public message$:Observable<Message> = of({isDisplayed: false, message: ''})
  displayMessageSubject = new BehaviorSubject<Observable<Message>>(this.message$);

  ngOnInit()
  {

  }

  openMessageBlock(message: Observable<Message>)
  {
    this.displayMessageSubject.next(message);
  }

  getBoards() {
    this.boardApi.getBoards().subscribe((value => {
      this.setState({
        ...this.state,
        boards: value
      });
    }))
    return this.boards$;
  }

  getBoard(id: string) {
    this.boardApi.getBoard(id).subscribe((value => {
      this.setState({
        ...this.state,
        board: value
      });
    }))
    return this.board$;
  }

  createBoard(board:Board)
  {
    this.boardApi.createBoard(board)
    .pipe(mergeMap(message => {
      return this.boardApi.getBoards()
    })).subscribe(value => {
      this.setState({
        ...this.state,
        boards: value
      });
    })
  }

  updateBoard(board:Board)
  {
    this.boardApi.updateBoard(board)
    .pipe(mergeMap(message => {
      return this.boardApi.getBoards()
    })).subscribe(value => {
      this.setState({
        ...this.state,
        boards: value
      });
    })
  }

  deleteBoard(board:Board | undefined)
  {
    this.boardApi.deleteBoard(board)
    .pipe(mergeMap(message => {
      return this.boardApi.getBoards()
    })).subscribe(value => {
      this.setState({
        ...this.state,
        boards: value
      });
    })
  }

  getTasks(board_id:string) {
    this.taskApi.getTasks(board_id).subscribe((value => {
      this.setState({
        ...this.state,
        tasks: value
      });
    }))
    return this.tasks$;
  }

  getTasksByStatus(board_id:string, status:string) {
    this.taskApi.getTasksByStatus(board_id, status).subscribe((value => {
      this.setState({
        ...this.state,
        tasks: value
      });
    }))
    return this.tasks$;
  }

  getTask(id: string)
  {
    let task;
    this.taskApi.getTask(id).subscribe((value => {
      this.setState({
        ...this.state,
        task: value
      });
      task = value;
    }))
    return task;
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
      console.log(value)
      this.setState({
        ...this.state,
        tasks: value
      });
    })
  }

  setCurrentValues(board: Board, task: Task)
  {
    this.setState({
      ...this.state,
      task: task,
      board: board
    });
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

  setCurrentBoard(board: Board)
  {
    this.setState({
      ...this.state,
      board: board
    });
  }
}

export class BoardsObject{
  constructor(boards:Board[])
  {
    this.boards = boards;
  }
  public boards:Board[];
}

export class TasksObject{
  constructor(tasks:Task[])
  {
    this.tasks = tasks;
  }
  public tasks:Task[];
}

export class TaskObject{
  constructor(task:Task)
  {
    this.task = task;
  }
  public task:Task;
}

export class BoardObject{
  constructor(board:Board)
  {
    this.board = board;
  }
  public board:Board;
}
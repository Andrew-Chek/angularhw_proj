import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { boards } from 'src/app/shared/testingData/boardsMock';
import { Board } from 'src/app/shared/interfaces/Board';
import { Task } from 'src/app/shared/interfaces/Task';
import { tasks } from 'src/app/shared/testingData/tasksMock';
import { TasksStateService } from './tasks-state.service';
import { BoardsStateService } from '../boards-state/boards-state.service';
import { of } from 'rxjs';
import { Comment } from 'src/app/shared/interfaces/Comment';
import { task } from 'src/app/shared/testingData/taskMock';

describe('TasksStateService', () => {
  let service: TasksStateService;
  const currentBoard = {_id: '4', name: 'tested board', description: 'tested value', created_date: ''};
  let boardsStateServiceStab: Partial<BoardsStateService> = {
    state$: of({board: currentBoard, boards: boards})
  }
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  const apiUrl = 'https://n-npb6.onrender.com/api';
  let copiedBoards: Board[] = [...boards]
  let copiedTasks: Task[] = [...tasks]

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        TasksStateService,
        {provide: BoardsStateService, useValue: boardsStateServiceStab},
        HttpClient,
      ]
    })

    httpTestingController = TestBed.inject(HttpTestingController);
    httpClient = TestBed.inject(HttpClient);
    service = TestBed.inject(TasksStateService);
    copiedBoards = [...boards]
    copiedTasks = [...tasks]
  });

  describe('#getTasks', () => {
    it('should update state properly', () => {
      const tasks$ = service.getTasks('1')
      const expectedTasks = copiedTasks.filter(task => task.board_id == '1')

      const req = httpTestingController.expectOne(`${apiUrl}/tasks/1`);
      req.flush({tasks: expectedTasks})

      tasks$.subscribe(value => expect(value).toEqual(expectedTasks))
    })

    it('should set empty tasks', () => {
      const tasks$ = service.getTasks('1')

      const req = httpTestingController.expectOne(`${apiUrl}/tasks/1`);
      req.flush({tasks: []})

      tasks$.subscribe(value => expect(value).toEqual([]))
    })
  })

  describe('#getTask', () => {
    it('should update state as expected', () => {
      const task$ = service.getTask('1')
      const expectedTask = copiedTasks.find(task => task._id == '1')!

      const req = httpTestingController.expectOne(`${apiUrl}/tasks/single/1`);
      req.flush({task: expectedTask})

      task$.subscribe(value => expect(value).toEqual(expectedTask))
    })
  })

  describe('#getTaskValue', () => {
    it('state should be without changes and expected task received', () => {
      const task$ = service.getTaskValue('1')
      const expectedTask = copiedTasks.find(task => task._id == '1')!
      task$.subscribe(value => {
        expect(value).toEqual(expectedTask);
      })

      const req = httpTestingController.expectOne(`${apiUrl}/tasks/single/1`);
      req.flush({task: expectedTask})

      task$.subscribe(value => expect(value).not.toEqual(expectedTask))
    })
  })

  describe('#createTask', () => {
    it('should update state properly', () => {
      const task: Task = {_id: '15', name: 'new board', board_id: '1', assigned_to: '', description: 'hello there', status: 'To do', isArchived: false, created_date: '15/12/2003',
      comments: []};
      service.createTask(task)
      copiedTasks.push(task)

      const createRequest = httpTestingController.expectOne(`${apiUrl}/tasks/`);
      expect(createRequest.request.method).toBe("POST");
      createRequest.flush({task})
      const getTasksRequest = httpTestingController.expectOne(`${apiUrl}/tasks/${currentBoard._id}`);
      expect(getTasksRequest.request.method).toBe("GET");
      getTasksRequest.flush({tasks: copiedTasks})

      service.state$.subscribe(value => expect(value.tasks).toContain(task))
    })
  })

  describe('#updateTask', () => {
    it('should update state as expected', () => {
      const updatedTask: Task = {_id: '5', name: 'new board', status: 'In progress',
        comments: [], isArchived: false, board_id: '2', assigned_to: '1', description: 'hello there', created_date: '15/12/2003'};
      service.updateTask(updatedTask)
      const updatedTasks = copiedTasks.map(currentTask => {
        currentTask._id == updatedTask._id ? currentTask = updatedTask: currentTask = currentTask
        return currentTask;
      })

      const updateRequest = httpTestingController.expectOne(`${apiUrl}/tasks/${updatedTask._id}`);
      expect(updateRequest.request.method).toBe("PUT");
      updateRequest.flush({task: updatedTask})
      const getTasksRequest = httpTestingController.expectOne(`${apiUrl}/tasks/${currentBoard._id}`);
      expect(getTasksRequest.request.method).toBe("GET");
      getTasksRequest.flush({tasks: updatedTasks})

      service.state$.subscribe(value => expect(value.tasks).toContain(updatedTask))
    })

    it('should get unchanged state', () => {
      const updatedTask: Task = {_id: '15', name: 'new board', status: 'In progress', isArchived: false,
      comments: [], board_id: '2', assigned_to: '1', description: 'hello there', created_date: '15/12/2003'};
      service.updateTask(updatedTask)
      const updatedTasks = copiedTasks.map(currentTask => {
        currentTask._id == updatedTask._id ? currentTask = updatedTask: currentTask = currentTask
        return currentTask;
      })

      const updateRequest = httpTestingController.expectOne(`${apiUrl}/tasks/${updatedTask._id}`);
      expect(updateRequest.request.method).toBe("PUT");
      updateRequest.flush({task: updatedTask})
      const getTasksRequest = httpTestingController.expectOne(`${apiUrl}/tasks/${currentBoard._id}`);
      expect(getTasksRequest.request.method).toBe("GET");
      updatedTasks != copiedTasks ? getTasksRequest.flush({tasks: updatedTasks}) : getTasksRequest.flush({tasks: copiedTasks})

      service.state$.subscribe(value => expect(value.tasks).toEqual(copiedTasks))
    })
  })

  describe('#deleteTask', () => {
    it('should update state as expected', () => {
      const deletedTask: Task = 
        {_id: '5', name: 'new board', status: 'In progress', isArchived: false, board_id: '2', assigned_to: '1',
        comments: [], description: 'hello there', created_date: '15/12/2003'};
      service.deleteTask(deletedTask)
      const updatedTasks = copiedTasks.map(currentTask => {
        currentTask._id == deletedTask._id ? copiedTasks.splice(copiedTasks.indexOf(currentTask), 1): currentTask = currentTask
        return currentTask;
      })

      const updateRequest = httpTestingController.expectOne(`${apiUrl}/tasks/${deletedTask._id}`);
      expect(updateRequest.request.method).toBe("DELETE");
      updateRequest.flush({task: deletedTask})
      const getTasksRequest = httpTestingController.expectOne(`${apiUrl}/tasks/${currentBoard._id}`);
      expect(getTasksRequest.request.method).toBe("GET");
      getTasksRequest.flush({tasks: updatedTasks})

      service.state$.subscribe(value => expect(value.tasks).not.toContain(deletedTask))
    })

    it('should get unchanged state', () => {
      const deletedTask: Task = 
        {_id: '5', name: 'new board',
        comments: [], status: 'In progress', isArchived: false, board_id: '2', assigned_to: '1', description: 'hello there', created_date: '15/12/2003'};
      service.deleteTask(deletedTask)
      const updatedTasks = copiedTasks.map(currentTask => {
        currentTask._id == deletedTask._id ? copiedTasks.splice(copiedTasks.indexOf(currentTask), 1): currentTask = currentTask
        return currentTask;
      })

      const updateRequest = httpTestingController.expectOne(`${apiUrl}/tasks/${deletedTask._id}`);
      expect(updateRequest.request.method).toBe("DELETE");
      updateRequest.flush({task: deletedTask})
      const getTasksRequest = httpTestingController.expectOne(`${apiUrl}/tasks/${currentBoard._id}`);
      expect(getTasksRequest.request.method).toBe("GET");
      updatedTasks != copiedBoards ? getTasksRequest.flush({tasks: updatedTasks}) : getTasksRequest.flush({tasks: copiedTasks})

      service.state$.subscribe(value => expect(value.tasks).not.toContain(deletedTask))
    })
  })

  describe('#createComment', () => {
    it('', () => {
      
    })
  })

  describe('#deleteComment', () => {
    it('should update state as expected', () => {
      const deletedComment: Comment = {_id: '1', title: 'new title', message: 'new message', created_date: ''};
      const taskForDeleteComment = {...task}
      service.deleteComment(deletedComment, taskForDeleteComment)
      taskForDeleteComment.comments.splice(0, 1);


      const deleteRequest = httpTestingController.expectOne(`${apiUrl}/tasks/${taskForDeleteComment._id}/comment/${deletedComment._id}`);
      expect(deleteRequest.request.method).toBe("DELETE");
      service.getTask(taskForDeleteComment._id)
      const getTaskRequest = httpTestingController.expectOne(`${apiUrl}/tasks/single/${taskForDeleteComment._id}`);
      expect(getTaskRequest.request.method).toBe("GET");
      getTaskRequest.flush({task: taskForDeleteComment})

      service.state$.subscribe(value => expect(value.task.comments).not.toContain(deletedComment))
    })
  })

  describe('#setCurrentTask', () => {
    it('state should contain expected task', () => {
      const task: Task = tasks[0]
      service.setCurrentTask(task);
      service.state$.subscribe(value => {
        expect(value.task).toEqual(task)
      })
    })
  })
});
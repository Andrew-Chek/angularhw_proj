import { TestBed } from '@angular/core/testing';

import { AdminService } from './admin.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { boards } from 'src/app/shared/testingData/boardsMock';
import { Board } from 'src/app/Board';
import { Task } from 'src/app/Task';
import { tasks } from 'src/app/shared/testingData/tasksMock';

describe('AdminService', () => {
  let service: AdminService;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  const apiUrl = 'http://localhost:8080/api';
  let copiedBoards: Board[] = [...boards]
  let copiedTasks: Task[] = [...tasks]
  let currentBoard: Board = copiedBoards.find(board => board._id == '1')!;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        AdminService,
        HttpClient,
      ]
    })

    httpTestingController = TestBed.inject(HttpTestingController);
    httpClient = TestBed.inject(HttpClient);
    service = TestBed.inject(AdminService)
    copiedBoards = [...boards]
    copiedTasks = [...tasks]
    currentBoard = copiedBoards.find(board => board._id == '1')!
  });

  describe('#getBoards', () => {
    it('should update state properly', () => {
      const boards$ = service.getBoards()

      const req = httpTestingController.expectOne(`${apiUrl}/boards`);
      req.flush({boards: copiedBoards})

      boards$.subscribe(value => expect(value).toEqual(boards))
    })

    it('should set empty boards', () => {
      const boards$ = service.getBoards()

      const req = httpTestingController.expectOne(`${apiUrl}/boards`);
      req.flush({boards: []})

      boards$.subscribe(value => expect(value).toEqual([]))
    })
  })

  describe('#getBoard', () => {
    it('should update state properly', () => {
      const board$ = service.getBoard('1')
      const board = boards[0];

      const req = httpTestingController.expectOne(`${apiUrl}/boards/1`);
      req.flush({board: board})

      board$.subscribe(value => expect(value).toEqual(board))
    })
  })

  describe('#createBoard', () => {
    it('should update state properly', () => {
      const board = {_id: '15', name: 'new board', description: 'hello there', created_date: '15/12/2003'};
      service.createBoard(board)
      copiedBoards.push(board)
      const boards$ = service.getBoards();

      const requests = httpTestingController.match(`${apiUrl}/boards`);
      expect(requests[0].request.method).toBe("POST");
      requests[0].flush({board: board})
      expect(requests[1].request.method).toBe("GET");
      requests[1].flush({boards: copiedBoards})

      service.state$.subscribe(value => expect(value.boards).toContain(board))
    })
  })

  describe('#updateBoard', () => {
    it('should update state as expected', () => {
      const updatedBoard = {_id: '5', name: 'new board', description: 'hello there', created_date: '15/12/2003'};
      service.updateBoard(updatedBoard)
      const updatedBoards = copiedBoards.map(currentBoard => {
        currentBoard._id == updatedBoard._id ? currentBoard = updatedBoard: currentBoard = currentBoard
        return currentBoard;
      })

      const updateRequest = httpTestingController.expectOne(`${apiUrl}/boards/${updatedBoard._id}`);
      expect(updateRequest.request.method).toBe("PUT");
      updateRequest.flush({board: updatedBoard})
      const getBoardsRequest = httpTestingController.expectOne(`${apiUrl}/boards`);
      expect(getBoardsRequest.request.method).toBe("GET");
      getBoardsRequest.flush({boards: updatedBoards})

      service.state$.subscribe(value => expect(value.boards).toContain(updatedBoard))
    })

    it('should get unchanged state', () => {
      const updatedBoard = {_id: '15', name: 'new board', description: 'hello there', created_date: '15/12/2003'};
      service.updateBoard(updatedBoard)
      const updatedBoards = copiedBoards.map(currentBoard => {
        currentBoard._id == updatedBoard._id ? currentBoard = updatedBoard: currentBoard = currentBoard
        return currentBoard;
      })

      const updateRequest = httpTestingController.expectOne(`${apiUrl}/boards/${updatedBoard._id}`);
      expect(updateRequest.request.method).toBe("PUT");
      updateRequest.flush({board: updatedBoard})
      const getBoardsRequest = httpTestingController.expectOne(`${apiUrl}/boards`);
      expect(getBoardsRequest.request.method).toBe("GET");
      updatedBoards != copiedBoards ? getBoardsRequest.flush({boards: updatedBoards}) : getBoardsRequest.flush({boards: copiedBoards})

      service.state$.subscribe(value => expect(value.boards).toEqual(copiedBoards))
    })
  })

  describe('#deleteBoard', () => {
    it('should update state properly', () => {
      const deletedBoard = {_id: '5', name: 'new board', description: 'hello there', created_date: '15/12/2003'};
      service.deleteBoard(deletedBoard)
      const updatedBoards = copiedBoards.map(currentBoard => {
        currentBoard._id == deletedBoard._id ? copiedBoards.splice(copiedBoards.indexOf(currentBoard), 1): currentBoard = currentBoard
        return currentBoard;
      })

      const deleteRequest = httpTestingController.expectOne(`${apiUrl}/boards/${deletedBoard._id}`);
      expect(deleteRequest.request.method).toBe("DELETE");
      deleteRequest.flush({board: deletedBoard})
      const getBoardsRequest = httpTestingController.expectOne(`${apiUrl}/boards`);
      expect(getBoardsRequest.request.method).toBe("GET");
      getBoardsRequest.flush({boards: updatedBoards})

      service.state$.subscribe(value => expect(value.boards).not.toContain(deletedBoard))
    })

    it('should get unchanged state', () => {
      const deletedBoard = {_id: '15', name: 'new board', description: 'hello there', created_date: '15/12/2003'};
      service.deleteBoard(deletedBoard)
      const updatedBoards = copiedBoards.map(currentBoard => {
        currentBoard._id == deletedBoard._id ? copiedBoards.splice(copiedBoards.indexOf(currentBoard), 1): currentBoard = currentBoard
        return currentBoard;
      })

      const deleteRequest = httpTestingController.expectOne(`${apiUrl}/boards/${deletedBoard._id}`);
      expect(deleteRequest.request.method).toBe("DELETE");
      deleteRequest.flush({board: deletedBoard})
      const getBoardsRequest = httpTestingController.expectOne(`${apiUrl}/boards`);
      expect(getBoardsRequest.request.method).toBe("GET");
      updatedBoards != copiedBoards ? getBoardsRequest.flush({boards: updatedBoards}) : getBoardsRequest.flush({boards: copiedBoards})

      service.state$.subscribe(value => expect(value.boards).toEqual(copiedBoards))
    })
  })

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
      const task: Task = {_id: '15', name: 'new board', board_id: '1', assigned_to: '', description: 'hello there', status: 'To do', isArchived: false, created_date: '15/12/2003'};
      service.createTask(task)
      copiedTasks.push(task)

      const createRequest = httpTestingController.expectOne(`${apiUrl}/tasks/`);
      expect(createRequest.request.method).toBe("POST");
      createRequest.flush({task})
      const getTasksRequest = httpTestingController.expectOne(`${apiUrl}/tasks/`);
      expect(getTasksRequest.request.method).toBe("GET");
      getTasksRequest.flush({tasks: copiedTasks})

      service.state$.subscribe(value => expect(value.tasks).toContain(task))
    })
  })

  describe('#updateTask', () => {
    it('should update state as expected', () => {
      const updatedTask: Task = {_id: '5', name: 'new board', status: 'In progress', isArchived: false, board_id: '2', assigned_to: '1', description: 'hello there', created_date: '15/12/2003'};
      service.updateTask(updatedTask)
      const updatedTasks = copiedTasks.map(currentTask => {
        currentTask._id == updatedTask._id ? currentTask = updatedTask: currentTask = currentTask
        return currentTask;
      })

      const updateRequest = httpTestingController.expectOne(`${apiUrl}/tasks/${updatedTask._id}`);
      expect(updateRequest.request.method).toBe("PUT");
      updateRequest.flush({task: updatedTask})
      const getTasksRequest = httpTestingController.expectOne(`${apiUrl}/tasks/`);
      expect(getTasksRequest.request.method).toBe("GET");
      getTasksRequest.flush({tasks: updatedTasks})

      service.state$.subscribe(value => expect(value.tasks).toContain(updatedTask))
    })

    it('should get unchanged state', () => {
      const updatedTask: Task = {_id: '15', name: 'new board', status: 'In progress', isArchived: false, board_id: '2', assigned_to: '1', description: 'hello there', created_date: '15/12/2003'};
      service.updateTask(updatedTask)
      const updatedTasks = copiedTasks.map(currentTask => {
        currentTask._id == updatedTask._id ? currentTask = updatedTask: currentTask = currentTask
        return currentTask;
      })

      const updateRequest = httpTestingController.expectOne(`${apiUrl}/tasks/${updatedTask._id}`);
      expect(updateRequest.request.method).toBe("PUT");
      updateRequest.flush({task: updatedTask})
      const getTasksRequest = httpTestingController.expectOne(`${apiUrl}/tasks/`);
      expect(getTasksRequest.request.method).toBe("GET");
      updatedTasks != copiedTasks ? getTasksRequest.flush({tasks: updatedTasks}) : getTasksRequest.flush({tasks: copiedTasks})

      service.state$.subscribe(value => expect(value.tasks).toEqual(copiedTasks))
    })
  })

  describe('#deleteTask', () => {
    it('should update state as expected', () => {
      const deletedTask: Task = 
        {_id: '5', name: 'new board', status: 'In progress', isArchived: false, board_id: '2', assigned_to: '1', description: 'hello there', created_date: '15/12/2003'};
      service.deleteTask(deletedTask)
      const updatedTasks = copiedTasks.map(currentTask => {
        currentTask._id == deletedTask._id ? copiedTasks.splice(copiedTasks.indexOf(currentTask), 1): currentTask = currentTask
        return currentTask;
      })

      const updateRequest = httpTestingController.expectOne(`${apiUrl}/tasks/${deletedTask._id}`);
      expect(updateRequest.request.method).toBe("DELETE");
      updateRequest.flush({task: deletedTask})
      const getTasksRequest = httpTestingController.expectOne(`${apiUrl}/tasks/`);
      expect(getTasksRequest.request.method).toBe("GET");
      getTasksRequest.flush({tasks: updatedTasks})

      service.state$.subscribe(value => expect(value.tasks).not.toContain(deletedTask))
    })

    it('should get unchanged state', () => {
      const deletedTask: Task = 
        {_id: '5', name: 'new board', status: 'In progress', isArchived: false, board_id: '2', assigned_to: '1', description: 'hello there', created_date: '15/12/2003'};
      service.deleteTask(deletedTask)
      const updatedTasks = copiedTasks.map(currentTask => {
        currentTask._id == deletedTask._id ? copiedTasks.splice(copiedTasks.indexOf(currentTask), 1): currentTask = currentTask
        return currentTask;
      })

      const updateRequest = httpTestingController.expectOne(`${apiUrl}/tasks/${deletedTask._id}`);
      expect(updateRequest.request.method).toBe("DELETE");
      updateRequest.flush({task: deletedTask})
      const getTasksRequest = httpTestingController.expectOne(`${apiUrl}/tasks/`);
      expect(getTasksRequest.request.method).toBe("GET");
      updatedTasks != copiedBoards ? getTasksRequest.flush({tasks: updatedTasks}) : getTasksRequest.flush({tasks: copiedTasks})

      service.state$.subscribe(value => expect(value.tasks).not.toContain(deletedTask))
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

  describe('#setCurrentBoard', () => {
    it('state should contain expected task', () => {
      const board: Board = boards[0]
      service.setCurrentBoard(board);
      service.state$.subscribe(value => {
        expect(value.board).toEqual(board)
      })
    })
  })
});

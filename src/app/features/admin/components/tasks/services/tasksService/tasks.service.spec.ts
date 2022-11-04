import { HttpClient } from '@angular/common/http';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { TasksService } from './tasks.service';
import { Task } from 'src/app/Task';
import { tasks } from '../../../../../../shared/testingData/tasksMock'
import { Message } from 'src/app/Message';

describe('TasksService', () => {
  let service: TasksService;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let apiUrl = 'http://localhost:8080/api';
  let copiedTasks: Task[] = [...tasks]

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        TasksService,
        HttpClient
      ]
    });

    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(TasksService);
    copiedTasks = [...tasks]
  });

  afterEach(() => {
    httpTestingController.verify();
  })

  describe('#getTasks', () => {
    it('should send proper request', () => {
      window.localStorage.setItem('jwt_token', 'tested_token')

      service.getTasks('1').subscribe({
        next: data => expect(data).toBeTruthy(),
        error: fail
      })
  
      const req = httpTestingController.expectOne(`${apiUrl}/tasks/1`);
      expect(req.request.method).toEqual('GET');
    })

    it('should return expected response of tasks', () => {
      const searchedTasks = copiedTasks.filter(task => task.board_id == '1')

      service.getTasks('1').subscribe({
        next: data => {
          expect(data).toEqual(searchedTasks)
        },
        error: fail
      })

      const req = httpTestingController.expectOne(`${apiUrl}/tasks/1`);
      req.flush({tasks:searchedTasks})
    })

    it('should return empty array', () => {
      const searchedTasks = copiedTasks.filter(task => task.board_id === '5')
      service.getTasks('5').subscribe({
        next: data => {
          expect(data).toEqual([])
        },
        error: fail
      })

      const req = httpTestingController.expectOne(`${apiUrl}/tasks/${'5'}`);
      req.flush({tasks: searchedTasks})
    })

    it('should return expected tasks(called multiple times)', () => {
      const searchedTasks1 = copiedTasks.filter(task => task.board_id == '1')
      const searchedTasks2 = copiedTasks.filter(task => task.board_id == '2')
      const searchedTasks3 = copiedTasks.filter(task => task.board_id == '3')

      service.getTasks('1').subscribe()
      service.getTasks('3').subscribe()
      service.getTasks('2').subscribe({
        next: tasks => expect(tasks).toEqual(searchedTasks2),
        error: fail
      })

      const firstReq = httpTestingController.expectOne(`${apiUrl}/tasks/1`);
      const secondReq = httpTestingController.expectOne(`${apiUrl}/tasks/2`);
      const thirdReq = httpTestingController.expectOne(`${apiUrl}/tasks/3`);

      firstReq.flush(searchedTasks1)
      secondReq.flush({tasks: searchedTasks2})
      thirdReq.flush(searchedTasks3)
    })

    it('should throw error with non-existent id', () => {
      const data = `Such board_id doesn't exist`
      const mockErrorResponse = { status: 400, statusText: 'Bad Request' };
      let errResponse:string = '';

      service.getTasks('12')
      .subscribe({
      error: error => {
        errResponse = data
      }})
      const req = httpTestingController.expectOne(`${apiUrl}/tasks/12`);
      req.flush(data, mockErrorResponse);
      expect(errResponse).toBe(data);
    })
  })

  describe('#getTask', () => {
    it('should send proper request', () => {
      service.getTask('1').subscribe({
        next: data => expect(data).toBeTruthy(),
        error: fail
      })
  
      const req = httpTestingController.expectOne(`${apiUrl}/tasks/single/1`);
      expect(req.request.method).toEqual('GET');
    })

    it('should return expected response of task', () => {
      const searchedTask = copiedTasks.find(task => {
        task.board_id == '1';
      })

      service.getTask('1').subscribe({
        next: data => {
          expect(data).toEqual(searchedTask!)
        },
        error: fail
      })

      const req = httpTestingController.expectOne(`${apiUrl}/tasks/single/1`);
      req.flush({task: searchedTask})
    })

    it('should return expected task(called multiple times)', () => {
      const searchedTask1 = copiedTasks.find(task => {
        task.board_id === '1';
      })
      const searchedTask2 = copiedTasks.find(task => {
        task.board_id === '2';
      })
      const searchedTask3 = copiedTasks.find(task => {
        task.board_id === '3';
      })

      service.getTask('1').subscribe()
      service.getTask('3').subscribe()
      service.getTask('2').subscribe({
        next: task => {
          expect(task).toEqual(searchedTask2!)
        },
        error: fail
      })

      const firstReq = httpTestingController.expectOne(`${apiUrl}/tasks/single/1`);
      const secondReq = httpTestingController.expectOne(`${apiUrl}/tasks/single/2`);
      const thirdReq = httpTestingController.expectOne(`${apiUrl}/tasks/single/3`);

      firstReq.flush({task: searchedTask1})
      secondReq.flush({task: searchedTask2})
      thirdReq.flush({task: searchedTask3})
    })

    it('should throw error with non-existent id', () => {
      const data = `Such task_id doesn't exist`
      const mockErrorResponse = { status: 400, statusText: 'Bad Request' };
      let errResponse:string = '';

      service.getTask('123')
      .subscribe({
      error: error => {
        errResponse = data
      }})
      const req = httpTestingController.expectOne(`${apiUrl}/tasks/single/123`);
      req.flush(data, mockErrorResponse);
      expect(errResponse).toBe(data);
    })
  })

  describe('#createTask', () => {
    const task: Task = tasks[0]
    it('should send proper request', () => {
      service.createTask(task).subscribe({
        next: data => expect(data).toBeTruthy(),
        error: fail
      })
  
      const req = httpTestingController.expectOne(`${apiUrl}/tasks/`);
      expect(req.request.method).toEqual('POST');
    })

    it('should return expected message', () => {

      const message:Message = {isDisplayed:false, message: 'Task created successfully'};
      service.createTask(task).subscribe({
        next: data => {
          expect(data).toEqual(message)
        },
        error: fail
      })

      const req = httpTestingController.expectOne(`${apiUrl}/tasks/`);
      req.flush(message)
    })

    it('should update tasks array', () => {
      const message:Message = {isDisplayed:false, message: 'Task created successfully'};
      service.createTask(task).subscribe({
        next: data => {
          copiedTasks.push(task);
          expect(copiedTasks).toContain(task);
        },
        error: fail
      })

      const req = httpTestingController.expectOne(`${apiUrl}/tasks/`);
      req.flush(message)
    })

    it('should throw error with empty task', () => {
      const task: Task = {_id: '', name: '', description: '', board_id: '', assigned_to: '', status: '', created_date: '', isArchived: false}
      const data = `Task values cannot be empty`
      const mockErrorResponse = { status: 400, statusText: 'Bad Request' };
      let errResponse:string = '';

      service.createTask(task)
      .subscribe({
      error: error => {
        errResponse = data
      }})
      const req = httpTestingController.expectOne(`${apiUrl}/tasks/`);
      req.flush(data, mockErrorResponse);
      expect(errResponse).toBe(data);
    })

    it('should throw error with task with non-existent board_id', () => {
      const task: Task = copiedTasks[0];
      task.board_id = '12345'
      const data = `There is no board with such id`
      const mockErrorResponse = { status: 400, statusText: 'Bad Request' };
      let errResponse:string = '';

      service.createTask(task)
      .subscribe({
      error: error => {
        errResponse = data
      }})
      const req = httpTestingController.expectOne(`${apiUrl}/tasks/`);
      req.flush(data, mockErrorResponse);
      expect(errResponse).toBe(data);
    })

    it('should throw error with task with non-existent status', () => {
      const task: Task = copiedTasks[0];
      task.status = 'safsdvcx'
      const data = `Status isn't correct`
      const mockErrorResponse = { status: 400, statusText: 'Bad Request' };
      let errResponse:string = '';

      service.createTask(task)
      .subscribe({
      error: error => {
        errResponse = data
      }})
      const req = httpTestingController.expectOne(`${apiUrl}/tasks/`);
      req.flush(data, mockErrorResponse);
      expect(errResponse).toBe(data);
    })
  })

  describe('#updateTask', () => {
    const task: Task = copiedTasks[0]
    it('should send proper request', () => {
      service.updateTask(task).subscribe({
        next: data => expect(data).toBeTruthy(),
        error: fail
      })
  
      const req = httpTestingController.expectOne(`${apiUrl}/tasks/${task._id}`);
      expect(req.request.method).toEqual('PUT');
    })

    it('should return expected task', () => {

      service.updateTask(task).subscribe({
        next: data => {
          expect(data).toEqual(task)
        },
        error: fail
      })

      const req = httpTestingController.expectOne(`${apiUrl}/tasks/${task._id}`);
      req.flush(task)
    })

    it('should update tasks array', () => {
      const expectedTasks = [...copiedTasks];
      expectedTasks[1].name = 'New name';
      const updatedTask = copiedTasks[1];
      updatedTask.name = 'New name';
      service.updateTask(updatedTask).subscribe({
        next: data => {
          const updatedTasks = copiedTasks.map<Task>(task => {
            task == tasks[1] ? task.name = updatedTask.name : task = task;
            return task;
          })
          expect(updatedTasks).toEqual(expectedTasks);
        },
        error: fail
      })

      const req = httpTestingController.expectOne(`${apiUrl}/tasks/${updatedTask._id}`);
      req.flush(updatedTask)
    })

    it('should throw error with empty task', () => {
      const task: Task = {_id: '', name: '', description: '', board_id: '', assigned_to: '', status: '', created_date: '', isArchived: false}
      const data = `Task values cannot be empty`
      const mockErrorResponse = { status: 400, statusText: 'Bad Request' };
      let errResponse:string = '';

      service.updateTask(task)
      .subscribe({
      error: error => {
        errResponse = data
      }})
      const req = httpTestingController.expectOne(`${apiUrl}/tasks/${task._id}`);
      req.flush(data, mockErrorResponse);
      expect(errResponse).toBe(data);
    })

    it('should throw error with task with non-existent board_id', () => {
      const task: Task = copiedTasks[0];
      task.board_id = '12345'
      const data = `There is no board with such id`
      const mockErrorResponse = { status: 400, statusText: 'Bad Request' };
      let errResponse:string = '';

      service.updateTask(task)
      .subscribe({
      error: error => {
        errResponse = data
      }})
      const req = httpTestingController.expectOne(`${apiUrl}/tasks/${task._id}`);
      req.flush(data, mockErrorResponse);
      expect(errResponse).toBe(data);
    })

    it('should throw error with task with non-existent status', () => {
      const task: Task = copiedTasks[0];
      task.status = 'safsdvcx'
      const data = `Status isn't correct`
      const mockErrorResponse = { status: 400, statusText: 'Bad Request' };
      let errResponse:string = '';

      service.updateTask(task)
      .subscribe({
      error: error => {
        errResponse = data
      }})
      const req = httpTestingController.expectOne(`${apiUrl}/tasks/${task._id}`);
      req.flush(data, mockErrorResponse);
      expect(errResponse).toBe(data);
    })

    it('should throw error if there is no task with such id', () => {
      const task: Task = copiedTasks[0];
      task._id = '1231asd';
      const data = `there is no task with such id`
      const mockErrorResponse = { status: 400, statusText: 'Bad Request' };
      let errResponse:string = '';

      service.updateTask(task)
      .subscribe({
      error: error => {
        errResponse = data
      }})
      const req = httpTestingController.expectOne(`${apiUrl}/tasks/${task._id}`);
      req.flush(data, mockErrorResponse);
      expect(errResponse).toBe(data);
    })
  })

  describe('#deleteTask', () => {
    const task: Task = copiedTasks[0]
    it('should send proper request', () => {
      service.deleteTask(task._id).subscribe({
        next: data => expect(data).toBeTruthy(),
        error: fail
      })
  
      const req = httpTestingController.expectOne(`${apiUrl}/tasks/${task._id}`);
      expect(req.request.method).toEqual('DELETE');
    })

    it('should return expected task', () => {

      service.deleteTask(task._id).subscribe({
        next: data => {
          expect(data).toEqual(task)
        },
        error: fail
      })

      const req = httpTestingController.expectOne(`${apiUrl}/tasks/${task._id}`);
      req.flush(task)
    })

    it('should update tasks array', () => {
      const deletedTask = copiedTasks[0];
      service.deleteTask(task._id).subscribe({
        next: data => {
          const deletedTaskFromArray = copiedTasks.shift();
          expect(deletedTask).toEqual(deletedTaskFromArray!);
        },
        error: fail
      })

      const req = httpTestingController.expectOne(`${apiUrl}/tasks/${deletedTask._id}`);
      req.flush(deletedTask)
    })

    it('should throw error if there is no task with such id', () => {
      const task: Task = copiedTasks[0];
      task._id = '1231asd';
      const data = `there is no task with such id`
      const mockErrorResponse = { status: 400, statusText: 'Bad Request' };
      let errResponse:string = '';

      service.deleteTask(task._id)
      .subscribe({
      error: error => {
        errResponse = data
      }})
      const req = httpTestingController.expectOne(`${apiUrl}/tasks/${task._id}`);
      req.flush(data, mockErrorResponse);
      expect(errResponse).toBe(data);
    })
  })
});
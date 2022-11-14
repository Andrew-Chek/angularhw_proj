import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { BoardsService } from './boards.service';
import { boards } from '../../../../shared/testingData/boardsMock'
import { Message } from 'src/app/shared/interfaces/Message';
import { Board } from 'src/app/shared/interfaces/Board';

describe('TasksService', () => {
  let service: BoardsService;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  const apiUrl = 'https://n-npb6.onrender.com/api';
  let copiedBoards: Board[] = [...boards]

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        BoardsService,
        HttpClient
      ]
    });

    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(BoardsService);
    copiedBoards = [...boards]
  });

  afterEach(() => {
    httpTestingController.verify();
  })

  describe('#getBoards', () => {
    it('should send proper request', () => {

      service.getBoards().subscribe({
        next: data => expect(data).toBeTruthy(),
        error: fail
      })
  
      const req = httpTestingController.expectOne(`${apiUrl}/boards`);
      expect(req.request.method).toEqual('GET');
    })

    it('should return expected boards', () => {

      service.getBoards().subscribe({
        next: data => {
          expect(data).toEqual(boards)
        },
        error: fail
      })

      const req = httpTestingController.expectOne(`${apiUrl}/boards`);
      req.flush({boards: boards})
    })

    it('should return empty array', () => {
      service.getBoards().subscribe({
        next: data => {
          expect(data).toEqual([])
        },
        error: fail
      })

      const req = httpTestingController.expectOne(`${apiUrl}/boards`);
      req.flush({boards: []})
    })

    it('should return expected boards(called multiple times)', () => {


      service.getBoards().subscribe()
      service.getBoards().subscribe()
      service.getBoards().subscribe({
        next: receivedBoards => expect(receivedBoards).toEqual(boards),
        error: fail
      })

      const requests = httpTestingController.match(`${apiUrl}/boards`);

      requests[0].flush({boards: []})
      requests[1].flush({boards: [boards[0]]})
      requests[2].flush({boards: boards})
    })
  })

  describe('#getBoard', () => {
    it('should send proper request', () => {
      service.getBoard('1').subscribe({
        next: data => expect(data).toBeTruthy(),
        error: fail
      })
  
      const req = httpTestingController.expectOne(`${apiUrl}/boards/1`);
      expect(req.request.method).toEqual('GET');
    })

    it('should return expected board', () => {
      const searchedBoard = copiedBoards.find(board => {
        board._id == '2';
      })

      service.getBoard('2').subscribe({
        next: data => {
          expect(data).toEqual(searchedBoard!)
        },
        error: fail
      })

      const req = httpTestingController.expectOne(`${apiUrl}/boards/2`);
      req.flush({board: searchedBoard})
    })

    it('should return expected board(called multiple times)', () => {
      const searchedBoard1 = copiedBoards.find(board => {
        board._id === '1';
      })
      const searchedBoard2 = copiedBoards.find(board => {
        board._id === '2';
      })
      const searchedBoard3 = copiedBoards.find(board => {
        board._id === '3';
      })

      service.getBoard('1').subscribe()
      service.getBoard('3').subscribe()
      service.getBoard('2').subscribe({
        next: board => {
          expect(board).toEqual(searchedBoard2!)
        },
        error: fail
      })

      const firstReq = httpTestingController.expectOne(`${apiUrl}/boards/1`);
      const secondReq = httpTestingController.expectOne(`${apiUrl}/boards/2`);
      const thirdReq = httpTestingController.expectOne(`${apiUrl}/boards/3`);

      firstReq.flush({board: searchedBoard1})
      secondReq.flush({board: searchedBoard2})
      thirdReq.flush({board: searchedBoard3})
    })

    it('should throw error with non-existent id', () => {
      const data = `Such board_id doesn't exist`
      const mockErrorResponse = { status: 400, statusText: 'Bad Request' };
      let errResponse:string = '';

      service.getBoard('123')
      .subscribe({
      error: error => {
        errResponse = data
      }})
      const req = httpTestingController.expectOne(`${apiUrl}/boards/123`);
      req.flush(data, mockErrorResponse);
      expect(errResponse).toBe(data);
    })
  })

  describe('#createBoard', () => {
    const board: Board = copiedBoards[0]
    it('should send proper request', () => {
      service.createBoard(board).subscribe({
        next: data => expect(data).toBeTruthy(),
        error: fail
      })
  
      const req = httpTestingController.expectOne(`${apiUrl}/boards`);
      expect(req.request.method).toEqual('POST');
    })

    it('should return expected message', () => {

      const message:Message = {isDisplayed:false, message: 'Board created successfully'};
      service.createBoard(board).subscribe({
        next: data => {
          expect(data).toEqual(message)
        },
        error: fail
      })

      const req = httpTestingController.expectOne(`${apiUrl}/boards`);
      req.flush(message)
    })

    it('should update board array', () => {
      const message:Message = {isDisplayed:false, message: 'Board created successfully'};
      service.createBoard(board).subscribe({
        next: data => {
          copiedBoards.push(board);
          expect(copiedBoards).toContain(board);
        },
        error: fail
      })

      const req = httpTestingController.expectOne(`${apiUrl}/boards`);
      req.flush(message)
    })

    it('should throw error with empty board', () => {
      const board: Board = {_id: '', name: '', description: '', created_date: ''}
      const data = `Board values cannot be empty`
      const mockErrorResponse = { status: 400, statusText: 'Bad Request' };
      let errResponse:string = '';

      service.createBoard(board)
      .subscribe({
      error: error => {
        errResponse = data
      }})
      const req = httpTestingController.expectOne(`${apiUrl}/boards`);
      req.flush(data, mockErrorResponse);
      expect(errResponse).toBe(data);
    })

    it('should throw error with board with non-existent board_id', () => {
      const board: Board = copiedBoards[0];
      board._id = '12345'
      const data = `There is no board with such id`
      const mockErrorResponse = { status: 400, statusText: 'Bad Request' };
      let errResponse:string = '';

      service.createBoard(board)
      .subscribe({
      error: error => {
        errResponse = data
      }})
      const req = httpTestingController.expectOne(`${apiUrl}/boards`);
      req.flush(data, mockErrorResponse);
      expect(errResponse).toBe(data);
    })
  })

  describe('#updateBoard', () => {
    const board: Board = boards[0]
    it('should send proper request', () => {
      service.updateBoard(board).subscribe({
        next: data => expect(data).toBeTruthy(),
        error: fail
      })
  
      const req = httpTestingController.expectOne(`${apiUrl}/boards/${board._id}`);
      expect(req.request.method).toEqual('PUT');
    })

    it('should return expected board', () => {
      const message: Message = {isDisplayed: false, message: 'Board updated successfully'}

      service.updateBoard(board).subscribe({
        next: data => {
          expect(data).toEqual(message)
        },
        error: fail
      })

      const req = httpTestingController.expectOne(`${apiUrl}/boards/${board._id}`);
      req.flush(message)
    })

    it('should update board array', () => {
      const message: Message = {isDisplayed: false, message: 'Board updated successfully'}
      const expectedBoards = [...copiedBoards];
      expectedBoards[1].name = 'New name';
      const updatedBoard = copiedBoards[1];
      updatedBoard.name = 'New name';

      service.updateBoard(updatedBoard).subscribe({
        next: data => {
          const updatedBoards = copiedBoards.map<Board>(board => {
            board == copiedBoards[1] ? board.name = updatedBoard.name : board = board;
            return board;
          })
          expect(updatedBoards).toEqual(expectedBoards);
        },
        error: fail
      })

      const req = httpTestingController.expectOne(`${apiUrl}/boards/${updatedBoard._id}`);
      req.flush(message)
    })

    it('should throw error with empty board', () => {
      const board: Board = {_id: '', name: '', description: '', created_date: ''}
      const data = `Board values cannot be empty`
      const mockErrorResponse = { status: 400, statusText: 'Bad Request' };
      let errResponse:string = '';

      service.updateBoard(board)
      .subscribe({
      error: error => {
        errResponse = data
      }})
      const req = httpTestingController.expectOne(`${apiUrl}/boards/${board._id}`);
      req.flush(data, mockErrorResponse);
      expect(errResponse).toBe(data);
    })

    it('should throw error if there is no task with such id', () => {
      const board: Board = copiedBoards[0];
      board._id = '1231asd';
      const data = `there is no task with such id`
      const mockErrorResponse = { status: 400, statusText: 'Bad Request' };
      let errResponse:string = '';

      service.updateBoard(board)
      .subscribe({
      error: error => {
        errResponse = data
      }})
      const req = httpTestingController.expectOne(`${apiUrl}/boards/${board._id}`);
      req.flush(data, mockErrorResponse);
      expect(errResponse).toBe(data);
    })
  })

  describe('#deleteBoard', () => {
    const board: Board = copiedBoards[0]
    it('should send proper request', () => {
      service.deleteBoard(board).subscribe({
        next: data => expect(data).toBeTruthy(),
        error: fail
      })
  
      const req = httpTestingController.expectOne(`${apiUrl}/boards/${board._id}`);
      expect(req.request.method).toEqual('DELETE');
    })

    it('should return expected message', () => {
      const message: Message = {isDisplayed: false, message: 'Board deleted successfully'}

      service.deleteBoard(board).subscribe({
        next: data => {
          expect(data).toEqual(message)
        },
        error: fail
      })

      const req = httpTestingController.expectOne(`${apiUrl}/boards/${board._id}`);
      req.flush(message)
    })

    it('should update board array', () => {
      const message: Message = {isDisplayed: false, message: 'Board deleted successfully'}
      const deletedBoard = copiedBoards[0];
      service.deleteBoard(board).subscribe({
        next: data => {
          const deletedBoardFromArray = copiedBoards.shift();
          expect(deletedBoard).toEqual(deletedBoardFromArray!);
        },
        error: fail
      })

      const req = httpTestingController.expectOne(`${apiUrl}/boards/${deletedBoard._id}`);
      req.flush(message)
    })

    it('should throw error if there is no board with such id', () => {
      const board: Board = copiedBoards[0];
      board._id = '1231asd';
      const data = `there is no board with such id`
      const mockErrorResponse = { status: 400, statusText: 'Bad Request' };
      let errResponse:string = '';

      service.deleteBoard(board)
      .subscribe({
      error: error => {
        errResponse = data
      }})
      const req = httpTestingController.expectOne(`${apiUrl}/boards/${board._id}`);
      req.flush(data, mockErrorResponse);
      expect(errResponse).toBe(data);
    })
  })
});
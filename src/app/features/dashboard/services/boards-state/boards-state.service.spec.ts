import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { boards } from 'src/app/shared/testingData/boardsMock';
import { Board } from 'src/app/shared/interfaces/Board';
import { BoardsStateService } from './boards-state.service';

describe('BoardsStateService', () => {
  let service: BoardsStateService;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  const apiUrl = 'https://n-npb6.onrender.com/api';
  let copiedBoards: Board[] = [...boards]
  let currentBoard: Board = copiedBoards.find(board => board._id == '1')!;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        BoardsStateService,
        HttpClient,
      ]
    })

    httpTestingController = TestBed.inject(HttpTestingController);
    httpClient = TestBed.inject(HttpClient);
    service = TestBed.inject(BoardsStateService)
    copiedBoards = [...boards]
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
});
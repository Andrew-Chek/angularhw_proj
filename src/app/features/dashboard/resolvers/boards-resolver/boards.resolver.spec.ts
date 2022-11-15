import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Board } from 'src/app/shared/interfaces/Board';
import { boards } from 'src/app/shared/testingData/boardsMock';
import { BoardsService } from '../../components/boards/boards.service';

import { BoardsResolver } from './boards.resolver';

describe('BoardsResolver', () => {
  let resolver: BoardsResolver;
  let boardsServiceStab: Partial<BoardsService> = {
    getBoards: () => {return of(boards)}
  }
  let route : ActivatedRouteSnapshot;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {provide: BoardsService, useValue: boardsServiceStab}
      ]
    });
    resolver = TestBed.inject(BoardsResolver);
  });

  describe('#Set data after navigation', async () => {
    it(`should return expected boards` , () => {
      const currentData = resolver.resolve(route) as Observable<Board[]>;
      currentData.subscribe(value => {
        expect(value).toEqual(boards);
      })
    });
  })
});

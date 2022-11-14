import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Board } from 'src/app/shared/interfaces/Board';
import { boards } from 'src/app/shared/testingData/boardsMock';
import { BoardResolver } from './board.resolver';
import { BoardsService } from '../../components/boards/boards.service';

describe('BoardResolverResolver', () => {
  let resolver: BoardResolver;
  let boardsServiceStab: Partial<BoardsService> = {
    getBoard: (id: string) => {return of(boards[0])}
  }
  let route : ActivatedRouteSnapshot;

  beforeEach(() => {
    route = new ActivatedRouteSnapshot();
    TestBed.configureTestingModule({
      providers: [
        {provide: BoardsService, useValue: boardsServiceStab}
      ]
    });
    resolver = TestBed.inject(BoardResolver);
  });

  describe('#Set data after navigation', async () => {
    it(`should return expected boards` , () => {
      route.params = {'id': '1'}
      const currentData = resolver.resolve(route) as Observable<Board>;
      currentData.subscribe(value => {
        expect(value).toEqual(boards[0]);
      })
    });
  })
});

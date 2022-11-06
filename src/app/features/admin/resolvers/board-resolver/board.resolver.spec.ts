import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Board } from 'src/app/Board';
import { AdminService } from '../../admin.service';
import { AdminServiceMock } from '../../admin.service.mock';
import { boards } from 'src/app/shared/testingData/boardsMock';

import { BoardResolver } from './board.resolver';

describe('BoardResolverResolver', () => {
  let resolver: BoardResolver;
  let adminServiceMock: AdminServiceMock = new AdminServiceMock()
  let route : ActivatedRouteSnapshot;

  beforeEach(() => {
    route = new ActivatedRouteSnapshot();
    TestBed.configureTestingModule({
      providers: [
        {provide: AdminService, useValue: adminServiceMock}
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

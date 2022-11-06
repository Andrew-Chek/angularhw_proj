import { inject, TestBed } from '@angular/core/testing';
import { AdminService } from '../../admin.service';
import { AdminServiceMock } from '../../admin.service.mock';

import { TasksResolver } from './tasks.resolver';
import { Task } from 'src/app/Task';
import { tasks } from 'src/app/shared/testingData/tasksMock';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlSegment } from '@angular/router';
import { Observable, of } from 'rxjs';


describe('TasksResolverResolver', () => {
  let resolver: TasksResolver;
  let adminServiceMock: AdminServiceMock = new AdminServiceMock()
  let route : ActivatedRouteSnapshot;

  beforeEach(() => {
    route = new ActivatedRouteSnapshot();
    TestBed.configureTestingModule({
      providers: [
        {provide: AdminService, useValue: adminServiceMock}
      ]
    });
    resolver = TestBed.inject(TasksResolver);
  });

  describe('#Set data after navigation', async () => {
    it(`should return expected tasks` , () => {
      route.params = {'id': '1'}
      const currentData = resolver.resolve(route) as Observable<Task[]>;
      currentData.subscribe(value => {
        expect(value).toEqual(tasks);
      })
    });
  })
});

import { TestBed } from '@angular/core/testing';
import { TasksResolver } from './tasks.resolver';
import { Task } from 'src/app/shared/interfaces/Task';
import { tasks } from 'src/app/shared/testingData/tasksMock';
import { ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { TasksService } from '../../components/tasks/services/tasksService/tasks.service';


describe('TasksResolverResolver', () => {
  let resolver: TasksResolver;
  let tasksServiceStab: Partial<TasksService> = {
    getTasks: (id: string) => {return of(tasks)}
  }
  let route : ActivatedRouteSnapshot;

  beforeEach(() => {
    route = new ActivatedRouteSnapshot();
    TestBed.configureTestingModule({
      providers: [
        {provide: TasksService, useValue: tasksServiceStab}
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

import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Task } from 'src/app/shared/interfaces/Task';
import { TasksService } from '../../components/tasks/services/tasksService/tasks.service';

@Injectable({ providedIn: 'root' })
export class TasksResolver implements Resolve<Task[]> {
  constructor(private service: TasksService) {}

  resolve(
    route: ActivatedRouteSnapshot
  ): Observable<Task[]>|Promise<Task[]>|Task[] {
    return this.service.getTasks(route.paramMap.get('id')!);
  }
}

import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable } from 'rxjs';
import { Task } from 'src/app/Task';
import { AdminService } from '../../admin.service';

@Injectable({ providedIn: 'root' })
export class TasksResolver implements Resolve<Task[]> {
  constructor(private service: AdminService) {}

  resolve(
    route: ActivatedRouteSnapshot
  ): Observable<Task[]>|Promise<Task[]>|Task[] {
    return this.service.getTasks(route.paramMap.get('id')!);
  }
}

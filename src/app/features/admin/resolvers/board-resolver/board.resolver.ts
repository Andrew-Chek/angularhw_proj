import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { Board } from 'src/app/Board';
import { AdminService } from '../../admin.service';

@Injectable({ providedIn: 'root' })
export class BoardResolver implements Resolve<Board | undefined> {
  constructor(private service: AdminService) {}

  resolve(
    route: ActivatedRouteSnapshot
  ): Observable<Board | undefined>|Promise<Board | undefined>|Board {
    return this.service.getBoard(route.paramMap.get('id')!);
  }
}

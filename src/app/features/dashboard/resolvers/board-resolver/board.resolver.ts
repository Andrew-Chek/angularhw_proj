import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Board } from 'src/app/shared/interfaces/Board';
import { BoardsService } from '../../components/boards/boards.service';

@Injectable({ providedIn: 'root' })
export class BoardResolver implements Resolve<Board | undefined> {
  constructor(private service: BoardsService) {}

  resolve(
    route: ActivatedRouteSnapshot
  ): Observable<Board | undefined>|Promise<Board | undefined>|Board {
    return this.service.getBoard(route.paramMap.get('id')!);
  }
}

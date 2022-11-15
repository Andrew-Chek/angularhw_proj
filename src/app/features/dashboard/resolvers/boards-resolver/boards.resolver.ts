import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { Board } from 'src/app/shared/interfaces/Board';
import { BoardsService } from '../../components/boards/boards.service';

@Injectable({
  providedIn: 'root'
})
export class BoardsResolver implements Resolve<Board[]> {
  constructor(private service: BoardsService) {}
  resolve(route: ActivatedRouteSnapshot): 
  Observable<Board[]>|Promise<Board[]>| Board[] {
    return this.service.getBoards();
  }
}

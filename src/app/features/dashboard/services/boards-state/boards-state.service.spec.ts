import { TestBed } from '@angular/core/testing';

import { BoardsStateService } from './boards-state.service';

describe('BoardsStateService', () => {
  let service: BoardsStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BoardsStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

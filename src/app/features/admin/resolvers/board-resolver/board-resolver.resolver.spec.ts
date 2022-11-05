import { TestBed } from '@angular/core/testing';

import { BoardResolver } from './board-resolver.resolver';

describe('BoardResolverResolver', () => {
  let resolver: BoardResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(BoardResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});

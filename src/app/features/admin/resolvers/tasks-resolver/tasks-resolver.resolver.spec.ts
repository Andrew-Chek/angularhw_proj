import { TestBed } from '@angular/core/testing';

import { TasksResolver } from './tasks-resolver.resolver';

describe('TasksResolverResolver', () => {
  let resolver: TasksResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(TasksResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { newPostGuard } from './new-post.guard';

describe('newPostGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => newPostGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});

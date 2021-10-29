import { TestBed } from '@angular/core/testing';

import { BasicGuardGuard } from './basic-guard.guard';

describe('BasicGuardGuard', () => {
  let guard: BasicGuardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(BasicGuardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});

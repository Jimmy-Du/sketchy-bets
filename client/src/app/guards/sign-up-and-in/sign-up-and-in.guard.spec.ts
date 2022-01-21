import { TestBed } from '@angular/core/testing';

import { SignUpAndInGuard } from '../sign-up-and-in/sign-up-and-in.guard';

describe('SignUpAndInGuard', () => {
  let guard: SignUpAndInGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(SignUpAndInGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});

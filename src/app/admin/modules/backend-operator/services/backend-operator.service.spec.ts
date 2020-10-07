import { TestBed } from '@angular/core/testing';

import { BackendOperatorService } from './backend-operator.service';

describe('BackendOperatorService', () => {
  let service: BackendOperatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BackendOperatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

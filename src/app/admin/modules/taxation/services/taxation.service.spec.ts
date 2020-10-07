import { TestBed } from '@angular/core/testing';

import { TaxationService } from './taxation.service';

describe('TaxationService', () => {
  let service: TaxationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TaxationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

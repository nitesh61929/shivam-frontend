import { TestBed } from '@angular/core/testing';

import { ProvincesWithDistrictsService } from './provinces-with-districts.service';

describe('ProvincesWithDistrictsService', () => {
  let service: ProvincesWithDistrictsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProvincesWithDistrictsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

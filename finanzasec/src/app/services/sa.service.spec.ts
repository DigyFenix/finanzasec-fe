import { TestBed } from '@angular/core/testing';

import { SaService } from './sa.service';

describe('SweetalertService', () => {
  let service: SaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

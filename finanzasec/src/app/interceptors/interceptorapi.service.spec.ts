import { TestBed } from '@angular/core/testing';

import { InterceptorapiService } from './interceptorapi.service';

describe('InterceptorapiService', () => {
  let service: InterceptorapiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InterceptorapiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { HttpTokenInterceptorService } from './http-token-interceptor.service';

describe('HttpTokenInterceptorService', () => {
  let service: HttpTokenInterceptorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpTokenInterceptorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

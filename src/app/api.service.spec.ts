import { TestBed } from '@angular/core/testing';

import { APIService } from './api.service';
import { HttpClient } from '@angular/common/http';

describe('APIService', () => {
  let service: APIService;
  let httpSpy: jasmine.SpyObj<HttpClient>;

  beforeEach(() => {
    httpSpy = jasmine.createSpyObj('HttpClient', ['get']);

    TestBed.configureTestingModule({
      providers: [{provide: HttpClient, useValue: httpSpy}]
    });
    service = TestBed.inject(APIService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

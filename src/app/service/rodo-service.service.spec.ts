import { TestBed } from '@angular/core/testing';

import { RodoServiceService } from './rodo-service.service';

describe('RodoServiceService', () => {
  let service: RodoServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RodoServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

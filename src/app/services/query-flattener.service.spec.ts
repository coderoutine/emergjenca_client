import { TestBed } from '@angular/core/testing';

import { QueryFlattenerService } from './query-flattener.service';

describe('QueryFlattenerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: QueryFlattenerService = TestBed.get(QueryFlattenerService);
    expect(service).toBeTruthy();
  });
});

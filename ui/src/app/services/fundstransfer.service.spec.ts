import { TestBed } from '@angular/core/testing';

import { FundstransferService } from './fundstransfer.service';

describe('FundstransferService', () => {
  let service: FundstransferService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FundstransferService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

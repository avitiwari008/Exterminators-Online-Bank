import { TestBed } from '@angular/core/testing';

import { TransactionsdetailsService } from './transactionsdetails.service';

describe('TransactionsdetailsService', () => {
  let service: TransactionsdetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TransactionsdetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

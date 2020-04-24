import { TestBed } from '@angular/core/testing';

import { CustomercareService } from './customercare.service';

describe('CustomercareService', () => {
  let service: CustomercareService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomercareService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

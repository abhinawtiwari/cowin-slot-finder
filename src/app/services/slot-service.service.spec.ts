import { TestBed } from '@angular/core/testing';

import { SlotServiceService } from './slot-service.service';

describe('SlotServiceService', () => {
  let service: SlotServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SlotServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

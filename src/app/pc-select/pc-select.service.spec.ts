import { TestBed, inject } from '@angular/core/testing';

import { PcSelectService } from './pc-select.service';

describe('PcSelectService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PcSelectService]
    });
  });

  it('should be created', inject([PcSelectService], (service: PcSelectService) => {
    expect(service).toBeTruthy();
  }));
});

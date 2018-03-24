import { TestBed, inject } from '@angular/core/testing';

import { GmService } from './gm.service';

describe('GmService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GmService]
    });
  });

  it('should be created', inject([GmService], (service: GmService) => {
    expect(service).toBeTruthy();
  }));
});

import { TestBed } from '@angular/core/testing';

import { DevelopersService } from './developers.service';

describe('Developers', () => {
  let service: DevelopersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DevelopersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

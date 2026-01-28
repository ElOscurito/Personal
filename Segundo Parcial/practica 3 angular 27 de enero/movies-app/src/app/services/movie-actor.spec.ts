import { TestBed } from '@angular/core/testing';

import { MovieActor } from './movie-actor';

describe('MovieActor', () => {
  let service: MovieActor;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MovieActor);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

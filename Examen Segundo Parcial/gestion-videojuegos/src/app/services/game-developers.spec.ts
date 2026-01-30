import { TestBed } from '@angular/core/testing';

import { GameDevelopersService } from './game-developers.service';
import { GameDevelopers } from '../models/game-developers';

describe('GameDevelopers', () => {
  let service: GameDevelopersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GameDevelopersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

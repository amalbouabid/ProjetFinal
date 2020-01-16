import { TestBed } from '@angular/core/testing';

import { CreatetaskModeleService } from './createtask-modele.service';

describe('CreatetaskModeleService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CreatetaskModeleService = TestBed.get(CreatetaskModeleService);
    expect(service).toBeTruthy();
  });
});

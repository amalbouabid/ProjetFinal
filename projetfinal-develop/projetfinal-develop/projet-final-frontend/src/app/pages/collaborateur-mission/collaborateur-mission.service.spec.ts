import { TestBed } from '@angular/core/testing';

import { CollaborateurMissionService } from './collaborateur-mission.service';

describe('CollaborateurMissionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CollaborateurMissionService = TestBed.get(CollaborateurMissionService);
    expect(service).toBeTruthy();
  });
});

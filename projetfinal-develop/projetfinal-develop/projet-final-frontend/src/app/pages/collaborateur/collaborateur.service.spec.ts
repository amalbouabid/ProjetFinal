import { TestBed } from '@angular/core/testing';

import { CollaborateurService } from './collaborateur.service';

describe('CollaborateurService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CollaborateurService = TestBed.get(CollaborateurService);
    expect(service).toBeTruthy();
  });
});

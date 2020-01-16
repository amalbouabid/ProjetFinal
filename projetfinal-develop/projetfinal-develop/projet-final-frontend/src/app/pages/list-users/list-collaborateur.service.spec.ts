import { TestBed } from '@angular/core/testing';

import { ListCollaborateurService } from './list-collaborateur.service';

describe('ListCollaborateurService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ListCollaborateurService = TestBed.get(ListCollaborateurService);
    expect(service).toBeTruthy();
  });
});

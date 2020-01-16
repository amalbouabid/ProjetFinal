import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CollaborateurMissionComponent } from './collaborateur-mission.component';

describe('CollaborateurMissionComponent', () => {
  let component: CollaborateurMissionComponent;
  let fixture: ComponentFixture<CollaborateurMissionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CollaborateurMissionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CollaborateurMissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

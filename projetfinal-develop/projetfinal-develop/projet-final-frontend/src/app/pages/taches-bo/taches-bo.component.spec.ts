import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TachesBOComponent } from './taches-bo.component';

describe('TachesBOComponent', () => {
  let component: TachesBOComponent;
  let fixture: ComponentFixture<TachesBOComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TachesBOComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TachesBOComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

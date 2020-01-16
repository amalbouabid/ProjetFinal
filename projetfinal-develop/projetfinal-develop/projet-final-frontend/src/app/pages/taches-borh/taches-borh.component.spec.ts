import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TachesBORHComponent } from './taches-borh.component';

describe('TachesBORHComponent', () => {
  let component: TachesBORHComponent;
  let fixture: ComponentFixture<TachesBORHComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TachesBORHComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TachesBORHComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

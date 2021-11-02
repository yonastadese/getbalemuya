import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfessinalsComponent } from './professinals.component';

describe('ProfessinalsComponent', () => {
  let component: ProfessinalsComponent;
  let fixture: ComponentFixture<ProfessinalsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfessinalsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfessinalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

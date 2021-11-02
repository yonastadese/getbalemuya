import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComplaintComponentForm } from './complaint.form.component';

describe('ComplaintComponent', () => {
  let component: ComplaintComponentForm;
  let fixture: ComponentFixture<ComplaintComponentForm>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComplaintComponentForm ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComplaintComponentForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

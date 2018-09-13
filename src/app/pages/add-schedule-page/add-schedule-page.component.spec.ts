import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSchedulePageComponent } from './add-schedule-page.component';

describe('AddSchedulePageComponent', () => {
  let component: AddSchedulePageComponent;
  let fixture: ComponentFixture<AddSchedulePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddSchedulePageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSchedulePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

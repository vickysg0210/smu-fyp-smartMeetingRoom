import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventMgmtPageComponent } from './event-mgmt-page.component';

describe('EventMgmtPageComponent', () => {
  let component: EventMgmtPageComponent;
  let fixture: ComponentFixture<EventMgmtPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventMgmtPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventMgmtPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

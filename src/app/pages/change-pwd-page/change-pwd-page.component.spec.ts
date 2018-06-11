import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangePwdPageComponent } from './change-pwd-page.component';

describe('ChangePwdPageComponent', () => {
  let component: ChangePwdPageComponent;
  let fixture: ComponentFixture<ChangePwdPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangePwdPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangePwdPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterBufferPageComponent } from './register-buffer-page.component';

describe('RegisterBufferPageComponent', () => {
  let component: RegisterBufferPageComponent;
  let fixture: ComponentFixture<RegisterBufferPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterBufferPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterBufferPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

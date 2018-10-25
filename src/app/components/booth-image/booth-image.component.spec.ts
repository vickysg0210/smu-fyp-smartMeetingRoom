import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoothImageComponent } from './booth-image.component';

describe('BoothImageComponent', () => {
  let component: BoothImageComponent;
  let fixture: ComponentFixture<BoothImageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoothImageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoothImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

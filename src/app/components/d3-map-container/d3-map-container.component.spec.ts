import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { D3MapContainerComponent } from './d3-map-container.component';

describe('D3MapContainerComponent', () => {
  let component: D3MapContainerComponent;
  let fixture: ComponentFixture<D3MapContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ D3MapContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(D3MapContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

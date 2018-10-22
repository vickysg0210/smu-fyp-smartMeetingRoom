import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoothLivePageComponent } from './booth-live-page.component';

describe('BoothLivePageComponent', () => {
  let component: BoothLivePageComponent;
  let fixture: ComponentFixture<BoothLivePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoothLivePageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoothLivePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

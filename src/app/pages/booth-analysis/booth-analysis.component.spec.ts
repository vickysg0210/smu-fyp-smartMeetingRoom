import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoothAnalysisComponent } from './booth-analysis.component';

describe('BoothAnalysisComponent', () => {
  let component: BoothAnalysisComponent;
  let fixture: ComponentFixture<BoothAnalysisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoothAnalysisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoothAnalysisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

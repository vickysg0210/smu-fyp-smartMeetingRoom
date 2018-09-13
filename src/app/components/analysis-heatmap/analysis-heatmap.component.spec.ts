import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalysisHeatmapComponent } from './analysis-heatmap.component';

describe('AnalysisHeatmapComponent', () => {
  let component: AnalysisHeatmapComponent;
  let fixture: ComponentFixture<AnalysisHeatmapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnalysisHeatmapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnalysisHeatmapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

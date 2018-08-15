import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AtteAnalysisComponent } from './atte-analysis.component';

describe('AtteAnalysisComponent', () => {
  let component: AtteAnalysisComponent;
  let fixture: ComponentFixture<AtteAnalysisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AtteAnalysisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AtteAnalysisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

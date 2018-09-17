import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TreemapIndustryComponent } from './treemap-industry.component';

describe('TreemapIndustryComponent', () => {
  let component: TreemapIndustryComponent;
  let fixture: ComponentFixture<TreemapIndustryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TreemapIndustryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TreemapIndustryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

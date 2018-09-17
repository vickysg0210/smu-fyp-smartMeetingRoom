import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TreemapCountryComponent } from './treemap-country.component';

describe('TreemapCountryComponent', () => {
  let component: TreemapCountryComponent;
  let fixture: ComponentFixture<TreemapCountryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TreemapCountryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TreemapCountryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

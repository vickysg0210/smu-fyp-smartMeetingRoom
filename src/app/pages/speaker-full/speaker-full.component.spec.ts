import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpeakerFullComponent } from './speaker-full.component';

describe('SpeakerFullComponent', () => {
  let component: SpeakerFullComponent;
  let fixture: ComponentFixture<SpeakerFullComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpeakerFullComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpeakerFullComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

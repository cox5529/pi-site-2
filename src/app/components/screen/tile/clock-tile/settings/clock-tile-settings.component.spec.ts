import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClockTileSettingsComponent } from './clock-tile-settings.component';

describe('ClockTileSettingsComponent', () => {
  let component: ClockTileSettingsComponent;
  let fixture: ComponentFixture<ClockTileSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClockTileSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClockTileSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

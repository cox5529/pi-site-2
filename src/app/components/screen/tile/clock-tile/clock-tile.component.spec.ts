import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ClockTileComponent } from './clock-tile.component';

describe('ClockTileComponent', () => {
  let component: ClockTileComponent;
  let fixture: ComponentFixture<ClockTileComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ClockTileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClockTileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

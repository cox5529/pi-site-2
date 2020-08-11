import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClockTileComponent } from './clock-tile.component';

describe('ClockTileComponent', () => {
  let component: ClockTileComponent;
  let fixture: ComponentFixture<ClockTileComponent>;

  beforeEach(async(() => {
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

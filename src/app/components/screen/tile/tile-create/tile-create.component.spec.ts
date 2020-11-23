import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TileCreateComponent } from './tile-create.component';

describe('TileCreateComponent', () => {
  let component: TileCreateComponent;
  let fixture: ComponentFixture<TileCreateComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TileCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TileCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

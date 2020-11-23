import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TileEditComponent } from './tile-edit.component';

describe('TileEditComponent', () => {
  let component: TileEditComponent;
  let fixture: ComponentFixture<TileEditComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TileEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TileEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

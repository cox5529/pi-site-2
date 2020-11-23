import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ScreenListComponent } from './screen-list.component';

describe('ScreenListComponent', () => {
  let component: ScreenListComponent;
  let fixture: ComponentFixture<ScreenListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ScreenListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScreenListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ScreenDetailsComponent } from './screen-details.component';

describe('ScreenDetailsComponent', () => {
  let component: ScreenDetailsComponent;
  let fixture: ComponentFixture<ScreenDetailsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ScreenDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScreenDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

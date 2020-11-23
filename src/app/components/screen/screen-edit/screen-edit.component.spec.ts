import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ScreenEditComponent } from './screen-edit.component';

describe('ScreenEditComponent', () => {
  let component: ScreenEditComponent;
  let fixture: ComponentFixture<ScreenEditComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ScreenEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScreenEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

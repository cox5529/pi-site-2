import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ScreenCreateComponent } from './screen-create.component';

describe('ScreenCreateComponent', () => {
  let component: ScreenCreateComponent;
  let fixture: ComponentFixture<ScreenCreateComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ScreenCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScreenCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

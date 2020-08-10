import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScreenEditComponent } from './screen-edit.component';

describe('ScreenEditComponent', () => {
  let component: ScreenEditComponent;
  let fixture: ComponentFixture<ScreenEditComponent>;

  beforeEach(async(() => {
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

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScreenCreateComponent } from './screen-create.component';

describe('ScreenCreateComponent', () => {
  let component: ScreenCreateComponent;
  let fixture: ComponentFixture<ScreenCreateComponent>;

  beforeEach(async(() => {
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

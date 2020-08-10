import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScreenDetailsComponent } from './screen-details.component';

describe('ScreenDetailsComponent', () => {
  let component: ScreenDetailsComponent;
  let fixture: ComponentFixture<ScreenDetailsComponent>;

  beforeEach(async(() => {
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

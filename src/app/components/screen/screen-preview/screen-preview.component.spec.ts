import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ScreenPreviewComponent } from './screen-preview.component';

describe('ScreenPreviewComponent', () => {
  let component: ScreenPreviewComponent;
  let fixture: ComponentFixture<ScreenPreviewComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ScreenPreviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScreenPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

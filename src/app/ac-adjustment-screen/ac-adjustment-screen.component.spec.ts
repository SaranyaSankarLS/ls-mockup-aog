import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AcAdjustmentScreenComponent } from './ac-adjustment-screen.component';

describe('AcAdjustmentScreenComponent', () => {
  let component: AcAdjustmentScreenComponent;
  let fixture: ComponentFixture<AcAdjustmentScreenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AcAdjustmentScreenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AcAdjustmentScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

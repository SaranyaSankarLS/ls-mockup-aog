import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CurtainAdjustmentScreenComponent } from './curtain-adjustment-screen.component';

describe('CurtainAdjustmentScreenComponent', () => {
  let component: CurtainAdjustmentScreenComponent;
  let fixture: ComponentFixture<CurtainAdjustmentScreenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CurtainAdjustmentScreenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurtainAdjustmentScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

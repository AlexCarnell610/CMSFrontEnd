import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalvingStatsModalComponent } from './calving-stats-modal.component';

describe('CalvingStatsModalComponent', () => {
  let component: CalvingStatsModalComponent;
  let fixture: ComponentFixture<CalvingStatsModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalvingStatsModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalvingStatsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

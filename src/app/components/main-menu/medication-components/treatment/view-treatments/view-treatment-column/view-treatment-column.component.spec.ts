import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewTreatmentColumnComponent } from './view-treatment-column.component';

describe('ViewTreatmentColumnComponent', () => {
  let component: ViewTreatmentColumnComponent;
  let fixture: ComponentFixture<ViewTreatmentColumnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewTreatmentColumnComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewTreatmentColumnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

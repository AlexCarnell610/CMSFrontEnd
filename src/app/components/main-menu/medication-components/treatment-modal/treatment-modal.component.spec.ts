import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TreatmentModalComponent } from './treatment-modal.component';

describe('TreatmentModalComponent', () => {
  let component: TreatmentModalComponent;
  let fixture: ComponentFixture<TreatmentModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TreatmentModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TreatmentModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

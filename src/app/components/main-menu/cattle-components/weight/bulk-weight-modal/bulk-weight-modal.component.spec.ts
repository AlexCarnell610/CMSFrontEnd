import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BulkWeightModalComponent } from './bulk-weight-modal.component';

describe('BulkWeightModalComponent', () => {
  let component: BulkWeightModalComponent;
  let fixture: ComponentFixture<BulkWeightModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BulkWeightModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BulkWeightModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

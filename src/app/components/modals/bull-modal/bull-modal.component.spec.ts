import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BullModalComponent } from './bull-modal.component';

describe('BullModalComponent', () => {
  let component: BullModalComponent;
  let fixture: ComponentFixture<BullModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BullModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BullModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

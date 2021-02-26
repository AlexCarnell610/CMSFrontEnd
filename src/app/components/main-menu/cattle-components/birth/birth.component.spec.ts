import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BirthComponent } from './birth.component';

describe('BirthComponent', () => {
  let component: BirthComponent;
  let fixture: ComponentFixture<BirthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BirthComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BirthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

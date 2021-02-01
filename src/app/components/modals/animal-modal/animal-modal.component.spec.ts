import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimalModalComponent } from './animal-modal.component';

describe('AnimalModalComponent', () => {
  let component: AnimalModalComponent;
  let fixture: ComponentFixture<AnimalModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnimalModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnimalModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

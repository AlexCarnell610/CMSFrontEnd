import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimalDisplayComponent } from './animal-display.component';

describe('AnimalDisplayComponent', () => {
  let component: AnimalDisplayComponent;
  let fixture: ComponentFixture<AnimalDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnimalDisplayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnimalDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

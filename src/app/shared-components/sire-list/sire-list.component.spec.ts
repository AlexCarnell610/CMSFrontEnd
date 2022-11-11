import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SireListComponent } from './sire-list.component';

describe('SireListComponent', () => {
  let component: SireListComponent;
  let fixture: ComponentFixture<SireListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SireListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SireListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

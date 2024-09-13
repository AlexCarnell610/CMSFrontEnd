import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BcmsRegisteredComponent } from './yes-no-check.component';

describe('BcmsRegisteredComponent', () => {
  let component: BcmsRegisteredComponent;
  let fixture: ComponentFixture<BcmsRegisteredComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BcmsRegisteredComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BcmsRegisteredComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

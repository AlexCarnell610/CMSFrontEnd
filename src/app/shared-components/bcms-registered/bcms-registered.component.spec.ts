import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BcmsRegisteredComponent } from './bcms-registered.component';

describe('BcmsRegisteredComponent', () => {
  let component: BcmsRegisteredComponent;
  let fixture: ComponentFixture<BcmsRegisteredComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BcmsRegisteredComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BcmsRegisteredComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

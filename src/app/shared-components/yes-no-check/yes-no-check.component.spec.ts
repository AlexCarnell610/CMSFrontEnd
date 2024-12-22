import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YesNoCheckComponent } from './yes-no-check.component';

describe('BcmsRegisteredComponent', () => {
  let component: YesNoCheckComponent;
  let fixture: ComponentFixture<YesNoCheckComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ YesNoCheckComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(YesNoCheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

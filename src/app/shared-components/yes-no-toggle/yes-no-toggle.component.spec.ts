import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YesNoToggleComponent } from './yes-no-toggle.component';

describe('YesNoToggleComponent', () => {
  let component: YesNoToggleComponent;
  let fixture: ComponentFixture<YesNoToggleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ YesNoToggleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(YesNoToggleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CullUpdateComponent } from './cull-update.component';

describe('CullUpdateComponent', () => {
  let component: CullUpdateComponent;
  let fixture: ComponentFixture<CullUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CullUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CullUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

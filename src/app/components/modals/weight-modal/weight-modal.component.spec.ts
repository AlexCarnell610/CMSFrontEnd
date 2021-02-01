import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { EditWeightModalComponent } from './weight-modal.component';


describe('EditWeightModalComponent', () => {
  let component: EditWeightModalComponent;
  let fixture: ComponentFixture<EditWeightModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditWeightModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditWeightModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

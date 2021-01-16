import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Modals } from '@cms-enums';
import { Animal, AnimalWeight } from '@cms-interfaces';
import { RootState } from '@cms-ngrx/reducers';
import { Store } from '@ngrx/store';
import { RetrieveAnimalData } from 'libs/ngrx/src/lib/actions/src/animal.actions';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'cms-edit-weight-modal',
  templateUrl: './edit-weight-modal.component.html',
  styleUrls: ['./edit-weight-modal.component.css']
})
export class EditWeightModalComponent implements OnInit, AfterViewInit {

  constructor(private readonly modalService: NgxSmartModalService, private store: Store<RootState>) { }
  public animalWeights: Observable<AnimalWeight[]>;
  public $animal: Observable<Animal>;

  ngOnInit(): void {
    this.store.dispatch(new RetrieveAnimalData());
  }
  ngAfterViewInit(){
    const weightModal = this.modalService.get(Modals.Weight);

    this.$animal = weightModal.onDataAdded.pipe(map((data: Animal) => data))
   weightModal.onAnyCloseEvent.subscribe(() => {   
      weightModal.removeData();
    });
  }
  closeModal(){
    this.modalService.get(Modals.Weight).close()
  }

}

import { Injectable } from '@angular/core';
import { Animal, AnimalWeight } from '@cms-interfaces';
import { RootState } from '@cms-ngrx/reducers';
import { Store } from '@ngrx/store';
import { AddAnimalWeight, UpdateAnimalWeight } from 'libs/ngrx/src/lib/actions/src/animal.actions';
import { HttpService } from '../httpServices/src/http.service';

@Injectable({
  providedIn: 'root'
})
export class AnimalUpdateService {

  constructor(private readonly httpService: HttpService, private readonly store: Store<RootState>) { }

  public updateAnimalWeight(weightId: string, weightUpdate: any, animal: Animal, index){
    return new Promise(resolve=> {

      this.httpService
        .updateWeight(Number.parseInt(weightId), weightUpdate)
        .subscribe((res) => {
          // this.popover.open();
          let update = animal.weightData.slice();

          update.splice(index, 1, res);
          this.store.dispatch(
            new UpdateAnimalWeight({
              weightUpdate: {
                id: animal.tagNumber,
                changes: {
                  weightData: update,
                },
              },
            })
          );
          // this.editWeightForm
          //   .get(FormControls.WeightSelect)
          //   .setValue('invalid');
          //   this.selectedWeight = null;
          // this.showSuccess = true;
          // timer(3000).subscribe(() => {
          //   this.popover.close();
          // });
          // this.loadingService.setLoadingState(false);
          resolve(true);
        });
    })    
  }

  public addAnimalWeight(animalId: string, weight: AnimalWeight){
    return new Promise(resolve => {
      this.httpService.addWeight(animalId, weight).subscribe(res => {
        console.error(res);
        this.store.dispatch(
          new AddAnimalWeight({
            id: animalId,
            newWeight: res
          })
        )
        resolve(true);
      })
    })
  }
   
}

import { Injectable } from '@angular/core';
import { Animal, AnimalWeight } from '@cms-interfaces';
import { AddAnimalWeight, UpdateAnimalWeight } from '@cms-ngrx/actions';
import { RootState } from '@cms-ngrx/reducers';
import { Store } from '@ngrx/store';
import { HttpService } from '../../httpServices/src/http.service';

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

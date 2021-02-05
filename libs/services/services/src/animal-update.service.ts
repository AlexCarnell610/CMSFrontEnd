import { Injectable } from '@angular/core';
import { Animal, AnimalWeight } from '@cms-interfaces';
import { RootState } from '@cms-ngrx';
import {
  AddAnimal,
  AddAnimalWeight,
  UpdateAnimal,
  UpdateAnimalWeight
} from '@cms-ngrx/animal';
import { HttpService } from '@cms-services/http';
import { Store } from '@ngrx/store';

@Injectable({
  providedIn: 'root',
})
export class AnimalUpdateService {
  constructor(
    private readonly httpService: HttpService,
    private readonly store: Store<RootState>
  ) {}

  public updateAnimalWeight(
    weightId: string,
    weightUpdate: any,
    animal: Animal,
    index
  ): Promise<boolean> {
    return new Promise((resolve) => {
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
    });
  }

  public addAnimalWeight(
    animalId: string,
    weight: AnimalWeight
  ): Promise<boolean> {
    return new Promise((resolve) => {
      this.httpService.addWeight(animalId, weight).subscribe((res) => {
        console.error(res);
        this.store.dispatch(
          new AddAnimalWeight({
            id: animalId,
            newWeight: res,
          })
        );
        resolve(true);
      });
    });
  }

  public addAnimal(animal: Animal): Promise<boolean> {
    return new Promise((resolve) => {
      this.httpService.addAnimal(animal).subscribe((res) => {
        this.store.dispatch(new AddAnimal({ animal: res }));
        resolve(true);
      });
    });
  }

  public updateAnimal(tagNumber: string, animal): Promise<boolean> {
    return new Promise((resolve) => {
      this.httpService.updateAnimal(tagNumber, animal).subscribe(res => {
        this.store.dispatch(new UpdateAnimal({id: res.tagNumber, changes: res}))
        resolve(true);
      });
    })
  }
}

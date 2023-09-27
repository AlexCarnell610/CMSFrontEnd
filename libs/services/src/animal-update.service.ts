import { Injectable } from '@angular/core';
import { IAnimal, AnimalWeight, IBull } from '@cms-interfaces';
import { RootState } from '@cms-ngrx';
import {
  AddAnimal,
  AddAnimalWeight,
  UpdateAnimal,
  UpdateAnimalWeight,
} from '@cms-ngrx/animal';
import { UpsertBull } from '@cms-ngrx/bull';
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
    weightId: number,
    weightUpdate: any,
    animal: IAnimal
  ): Promise<boolean> {
    return new Promise((resolve) => {
      this.httpService.updateWeight(weightId, weightUpdate).subscribe((res) => {
        this.store.dispatch(
          new UpdateAnimalWeight({
            weightUpdate: {
              id: animal.tagNumber,
              changes: {
                weightData: res,
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
        this.store.dispatch(
          new AddAnimalWeight({
            newWeight: { id: animalId, changes: { weightData: res } },
          })
        );
        resolve(true);
      });
    });
  }

  public addAnimal(animal: IAnimal): Promise<boolean> {
    return new Promise((resolve) => {
      this.httpService.addAnimal(animal).subscribe((res) => {
        this.store.dispatch(new AddAnimal({ animal: res }));
        resolve(true);
      });
    });
  }

  public updateAnimal(tagNumber: string, animal): Promise<boolean> {
    return new Promise((resolve) => {
      this.httpService.updateAnimal(tagNumber, animal).subscribe((res) => {
        this.store.dispatch(
          new UpdateAnimal({ id: res.tagNumber, changes: res })
        );
        resolve(true);
      });
    });
  }

  public addBull(bull: IBull): Promise<boolean>{
    return new Promise(resolve => {
      this.httpService.addBull(bull).subscribe(res => {
        this.store.dispatch(new UpsertBull({bull: res}))
        resolve(true)
      })
    })
  }
}

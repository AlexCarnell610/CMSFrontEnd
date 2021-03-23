import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpUrls } from '@cms-enums';
import { Animal, AnimalWeight, Bull } from '@cms-interfaces';
import * as moment from 'moment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MappingService } from '../../services/src/importData.service';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(
    private http: HttpClient,
    private mappingService: MappingService
  ) {}

  public getAnimalData(): Observable<Animal[]> {
    return this.http.get(HttpUrls.Animals).pipe(
      map((response) => {
        return this.mappingService.importAnimalData(response);
      })
    );
  }

  public getBullData(): Observable<Bull[]> {
    return this.http.get(HttpUrls.Bulls).pipe(
      map((response) => {
        return this.mappingService.convertBulls(response);
      })
    );
  }

  public getOfflineData(): Observable<any> {
    return this.http.get(HttpUrls.OfflineAnimals).pipe(
      map((response) => {
        return this.mappingService.importAnimalData(response);
      })
    );
  }

  public updateWeight(id, update): Observable<AnimalWeight[]> {
    return this.http
      .patch(`${HttpUrls.PatchWeight}/${id}`, { ...update })
      .pipe(
        map((res) => this.mappingService.convertWeightData(Object.values(res)))
      );
  }

  public addWeight(animalId, weight): Observable<AnimalWeight[]> {
    return this.http
      .put(`${HttpUrls.PutWeight}/${animalId}`, { ...weight })
      .pipe(
        map((res) => this.mappingService.convertWeightData(Object.values(res)))
      );
  }

  public addAnimal(animal: Animal): Observable<Animal> {
    const newAnimal = {
      ...animal,
      dam: animal.damTag ? animal.damTag : animal.dam,
      birthDate: moment(animal.birthDate).format('yyyy-MM-DD'),
    };
    return this.http
      .post(HttpUrls.Animal, newAnimal)
      .pipe(map((res) => this.mappingService.importAnimalData([res])[0]));
  }

  public updateAnimal(tagNumber: string, update): Observable<Animal> {
    const newUpdate = {
      ...update,
    };

    if (moment.isMoment(update.birthDate)) {
      newUpdate.birthDate = update.birthDate.format('YYYY-MM-DD');
    }

    return this.http
      .patch(`${HttpUrls.Animal}/${tagNumber}`, { ...newUpdate })
      .pipe(map((res) => this.mappingService.importAnimalData([res])[0]));
  }

  public getCullUpdate(): Observable<any> {
    return this.http.get(HttpUrls.CullUpdate);
  }
}

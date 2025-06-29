import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FORM_DATE_FORMAT, HttpUrls } from '@cms-enums';
import {
  IAnimal,
  AnimalWeight,
  IBull,
  IBulkWeight,
  Animal,
  IMedication,
  ITreatment,
} from '@cms-interfaces';
import moment from 'moment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../src/environments/environment';
import { MappingService } from '../../services/src/importData.service';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(
    private http: HttpClient,
    private mappingService: MappingService
  ) {}

  public getAnimalData(): Observable<IAnimal[]> {
    return this.http.get(environment.api + HttpUrls.Animals).pipe(
      map((response) => {
        return this.mappingService.importAnimalData(response);
      })
    );
  }

  public getBullData(): Observable<IBull[]> {
    return this.http.get(environment.api + HttpUrls.Bulls).pipe(
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
      .patch(`${environment.api + HttpUrls.PatchWeight}/${id}`, { ...update })
      .pipe(
        map((res) => this.mappingService.convertWeightData(Object.values(res)))
      );
  }

  public addWeight(animalId, weight): Observable<AnimalWeight[]> {
    return this.http
      .put(`${environment.api + HttpUrls.PutWeight}/${animalId}`, { ...weight })
      .pipe(
        map((res) => this.mappingService.convertWeightData(Object.values(res)))
      );
  }

  public addAnimal(animal: IAnimal): Observable<IAnimal> {
    const newAnimal = {
      ...animal,
      dam: animal.damTag ? animal.damTag : animal.dam,
      birthDate: moment(animal.birthDate).format(FORM_DATE_FORMAT),
    };
    return this.http
      .post(environment.api + HttpUrls.Animal, newAnimal)
      .pipe(map((res) => this.mappingService.importAnimalData([res])[0]));
  }

  public updateAnimal(tagNumber: string, update): Observable<IAnimal> {
    const newUpdate = {
      ...update,
    };

    if (moment.isMoment(update.birthDate)) {
      newUpdate.birthDate = update.birthDate.format('YYYY-MM-DD');
    }

    return this.http
      .patch(`${environment.api + HttpUrls.Animal}/${tagNumber}`, {
        ...newUpdate,
      })
      .pipe(map((res) => this.mappingService.importAnimalData([res])[0]));
  }

  public getCullUpdate(): Observable<any> {
    return this.http.get(environment.api + HttpUrls.CullUpdate);
  }

  public addBull(bull: IBull): Observable<IBull> {
    return this.http
      .post(environment.api + HttpUrls.Bull, bull)
      .pipe(map((res) => this.mappingService.convertBull(res)));
  }

  public updateBull(
    bull: Partial<IBull>,
    tagNumber: string
  ): Observable<IBull> {
    return this.http
      .patch(`${environment.api + HttpUrls.Bull}/${tagNumber}`, { ...bull })
      .pipe(map((response) => this.mappingService.convertBull(response)));
  }

  public addManyWeights(weights: IBulkWeight[]): Observable<AnimalWeight[][]> {
    const payload = weights.map((weight) => {
      return {
        ...weight,
        date: moment(weight.date).format('YYYY-MM-DD HH:mm:SS'),
      };
    });
    return this.http
      .post(`${environment.api + HttpUrls.Weights}`, { weights: payload })
      .pipe(
        map((response) => {
          let weightData: AnimalWeight[][] = [];
          for (let value of Object.values<any>(response)) {
            weightData.push(this.mappingService.convertWeightData(value, true));
          }

          return weightData;
        })
      );
  }

  public deleteWeight(weightID: number): Observable<AnimalWeight[]> {
    return this.http
      .delete(`${environment.api + HttpUrls.DeleteWeight}/${weightID}`)
      .pipe(
        map((response) => {
          return this.mappingService.convertWeightData(response as any[]);
        })
      );
  }

  public addMedication(medication: IMedication): Observable<IMedication> {
    return this.http
      .post(`${environment.api + HttpUrls.Medication}`, medication)
      .pipe(
        map((response) =>
          this.mappingService.convertSingleMedication(response as any)
        )
      );
  }

  public getMedicationData(): Observable<{
    medications: IMedication[];
    treatments: ITreatment[];
  }> {
    return this.http.get(`${environment.api + HttpUrls.Medication}`).pipe(
      map((response) => {
        return {
          medications: this.mappingService.convertMedications(
            (response as any).medications as any[]
          ),
          treatments: this.mappingService.convertTreatments(
            (response as any).treatments as any[]
          ),
        };
      })
    );
  }

  public updateMedication(
    medication: Partial<IMedication>,
    id: string
  ): Observable<IMedication> {
    return this.http
      .patch(`${environment.api + HttpUrls.Medication}/${id}`, {
        ...medication,
      })
      .pipe(
        map((response) => this.mappingService.convertSingleMedication(response))
      );
  }

  public storeTreatment(treatment: ITreatment): Observable<ITreatment> {
    return this.http
      .post(`${environment.api + HttpUrls.Treatment}`, treatment)
      .pipe(
        map((response) =>
          this.mappingService.convertSingleTreatment(response as any)
        )
      );
  }

  public updateTreatment(
    treatment: Partial<ITreatment>,
    id: string
  ): Observable<ITreatment> {
    return this.http
      .patch(`${environment.api + HttpUrls.Treatment}/${id}`, {
        ...treatment
      })
      .pipe(
        map((response) => this.mappingService.convertSingleTreatment(response))
      );
  }
}

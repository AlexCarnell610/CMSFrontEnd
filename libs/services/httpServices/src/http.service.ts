import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpUrls } from '@cms-enums';
import { AnimalWeight } from '@cms-interfaces';
import { MappingService } from 'libs/services/services/src/importData.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(
    private http: HttpClient,
    private mappingService: MappingService
  ) {}

  public getAnimalData(): Observable<any> {
    return this.http.get(HttpUrls.Animals).pipe(
      map((response) => {
        return this.mappingService.importAnimalData(response);
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

  public updateWeight(id, update): Observable<AnimalWeight> {
    return this.http
      .patch(`${HttpUrls.PatchWeight}/${id}`, { ...update })
      .pipe(map((res) => this.mappingService.convertWeight(res)));
  }

  public addWeight(animalId, weight): any {
    return this.http.put(`${HttpUrls.PutWeight}/${animalId}`, {...weight})
     .pipe(map(res => this.mappingService.convertWeight(res)))
  }
}

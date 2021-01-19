import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpUrls } from '@cms-enums';
import { MappingService } from 'libs/services/services/src/importData.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient, private mappingService: MappingService) { }

  public getAnimalData(): Observable<any>{
    
      return this.http.get(HttpUrls.Animals).pipe(map(response => {
        return this.mappingService.importAnimalData(response);
      }))
  }

  public getOfflineData(): Observable<any> {
    return this.http.get(HttpUrls.OfflineAnimals).pipe(map(response => {
      return this.mappingService.importAnimalData(response);
    }))
  }

  public updateWeight(id, update): Observable<any> {
    return this.http.patch(`${HttpUrls.PatchWeight}/${id}`,{...update});
  }
}

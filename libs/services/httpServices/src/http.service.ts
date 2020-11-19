import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MappingService } from 'libs/services/services/src/importData.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient, private mappingService: MappingService) { }

  public getAllData(): Observable<any>{
    
      return this.http.get('/api/animals').pipe(map(response => {
        return this.mappingService.importAnimalData(response);
      }))
  }

  public getOfflineData(): Observable<any> {
    return this.http.get('/assets/data.json').pipe(map(response => {
      return this.mappingService.importAnimalData(response);
    }))
  }
}

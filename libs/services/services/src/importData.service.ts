import { Injectable } from "@angular/core";
import { Animal } from '@cms-interfaces';
import { HttpService } from '@cms-services/http';

@Injectable({
    providedIn: 'root'
})
export class ImportDataService {

    constructor(private readonly httpService: HttpService){}

    public importData(){
        this.httpService.getAllData().subscribe(data => {
            console.warn("data", data)
            for(let value of Object.values(data)) {
                let animal: Animal;

                console.error("item",value)
            }
        })
    }
}
import { Injectable } from "@angular/core";
import { AI, Animal, AnimalWeight, Bull, CalvingHistory, CalvingStat, Dam } from '@cms-interfaces';
import * as moment from 'moment';

@Injectable({
    providedIn: 'root'
})
export class MappingService {

    constructor(){}

    public importAnimalData(animalData: Object){
        // console.error("TRIGGERED");
            let mappedAnimals: Animal[] = [];
            
            for(let value of Object.values<any>(animalData)) {                                
                mappedAnimals.push({
                    tagNumber: value.tag_number,
                    managementTag: value.management_tag,
                    gender: value.sex,
                    ai : value.ai_history.length === 0 ? [] : this.convertAiHistory(value.ai_history),
                    birthDate: moment(value.birth_date, 'YYYY-MM-D'),
                    calvingHistory: value.calving_history.length === 0 ? [] : this.convertCalvingHistory(value.calving_history),
                    calvingStats: value.calving_stat.length === 0 ? [] : this.convertCalvingStats(value.calving_stat),
                    dam: this.convertDam(value.dam),
                    sire: this.convertBull(value.sire),
                    weightData: this.convertWeightData(value.weight_data)
                });                
            }
            return mappedAnimals;
    }
    private convertWeightData(weightData: any[]): AnimalWeight[] {
        return weightData.map(weight => {
            return {
                id: weight.id,
                weightDate: this.convertDate(weight.weight_date),
                isInitial: weight.is_initial_weight,
                isSale: weight.is_sale_date,
                weight: weight.weight
            }
        })
    }
    private convertBull(sire: any): Bull {
        return {
            breed: sire.breed,
            name: sire.name,
            tagNumber: sire.tag_number
        }
    }

    private convertDam(dam: any): Dam{
        return {
            birthDate: this.convertDate(dam.birth_date),
            gender: dam.sex,
            managementTag: dam.management_tag,
            tagNumber: dam.tag_number,
            damTag: dam.dam_tag_number,
            sireTag: dam.sire_tag_number
        }
    }

    private convertCalvingStats(calvingSats: any[]): CalvingStat[]{
       return calvingSats.map(stat => {
           return {
               characteristic: stat.characteristic,
               score: stat.score,
               weighting: stat.weighting
           }
       })
    }

    private convertCalvingHistory(calvingHistory: any[]): CalvingHistory[]{
       return calvingHistory.map(calving => {
           return {
               averageGestation: calving.average_gestation,
               numberOfCalves: calving.number_of_calves
           }
       })
    }

    private convertAiHistory(aiHistory: any[]): AI[]{                
        return aiHistory.map(aiOccurence => {
            return {
                aiDate: this.convertDate(aiOccurence.ai_date),
                bull: {
                    breed: aiOccurence.bull.breed,
                    name: aiOccurence.bull.name,
                    tagNumber: aiOccurence.bull.tag_number
                },
                heatDate: this.convertDate(aiOccurence.heat_date),
                sweeperBull: aiOccurence.sweeper_bull,
                year: aiOccurence.year,
                id: aiOccurence.id
            }
        });
    }

    private convertDate(date: string) {
        return moment(date, 'YYYY-MM-D')
    }
}
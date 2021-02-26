import { Injectable } from '@angular/core';
import { AssistanceReason, CalvingAssistance } from '@cms-enums';
import {
  AI,
  Animal,
  AnimalWeight,
  Bull,
  CalvingHistory,
  CalvingStat,
  Dam,
} from '@cms-interfaces';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root',
})
export class MappingService {
  constructor() {}

  public importAnimalData(animalData: Object): Animal[] {
    let mappedAnimals: Animal[] = [];

    for (let value of Object.values<any>(animalData)) {
      mappedAnimals.push({
        tagNumber: value.tag_number,
        managementTag: value.management_tag,
        gender: value.sex,
        ai:
          value.ai_history.length === 0
            ? []
            : this.convertAiHistory(value.ai_history),
        birthDate: moment(value.birth_date, 'YYYY-MM-D'),
        calvingHistory:
          value.calving_history.length === 0
            ? []
            : this.convertCalvingHistory(value.calving_history),
        calvingStat: this.convertCalvingStats(value.calving_stat),
        dam: this.convertDam(value.dam),
        sire: { tagNumber: value.sire.tag_number },
        weightData: this.convertWeightData(value.weight_data),
        notes: value.notes,
        breed: value.breed,
      });
    }

    return mappedAnimals;
  }

  public convertBulls(bullData: Object): Bull[] {
    const convertedBulls: Bull[] = [];
    for (let value of Object.values<any>(bullData)) {
      convertedBulls.push(this.convertBull(value));
    }
    return convertedBulls;
  }

  public convertWeightData(weightData: any[]): AnimalWeight[] {
    return weightData.map((weight) => this.convertWeight(weight));
  }

  public convertWeight(weight: any): AnimalWeight {
    return {
      id: weight.id,
      weightDate: this.convertDate(weight.weight_date),
      weightType: {
        isInitial:
          weight.is_initial_weight === 1 || weight.is_initial_weight
            ? true
            : false,
        isSale:
          weight.is_sale_weight === 1 || weight.is_sale_weight ? true : false,
      },
      weight: weight.weight,
    };
  }
  private convertBull(sire: any): Bull {
    return {
      breed: sire.breed,
      name: sire.name,
      tagNumber: sire.tag_number,
    };
  }

  private convertDam(dam: any): Dam {
    return {
      birthDate: this.convertDate(dam.birth_date),
      gender: dam.sex,
      managementTag: dam.management_tag,
      tagNumber: dam.tag_number,
      damTag: dam.dam_tag_number,
      sireTag: dam.sire_tag_number,
    };
  }

  private convertCalvingStats(calvingStat: any): CalvingStat {
    return {
      alive: this.convertBoolean(calvingStat.alive),
      assistance: this.convertAssistance(calvingStat.assistance),
      damHealth: calvingStat.dam_health,
      drinkAssist: this.convertBoolean(calvingStat.alive)
        ? this.convertBoolean(calvingStat.drink_assist)
        : null,
      gettingUp: calvingStat.getting_up === null ? 5 : calvingStat.getting_up,
      assistanceReason: this.convertAssistanceReason(calvingStat.assist_reason),
      calvingNotes: calvingStat.calving_notes,
    };
  }

  private convertAssistanceReason(reasons: string): AssistanceReason[] {
    if (reasons === null) {
      return [AssistanceReason.NA];
    } else {
      const output: AssistanceReason[] = [];
      reasons.split('-').forEach((reason) => {
        if (reason === 'bc') {
          output.push(AssistanceReason.BigCalf);
        } else if (reason === 'pp') {
          output.push(AssistanceReason.PoorPresentation);
        } else {
          output.push(AssistanceReason.NA);
        }
      });

      return output;
    }
  }

  private convertBoolean(value) {
    return value === 1 || value === true;
  }

  private convertAssistance(assistance: string): CalvingAssistance {
    switch (assistance) {
      case 'v':
        return CalvingAssistance.Vet;
      case 'n':
        return CalvingAssistance.None;
      case 'r':
        return CalvingAssistance.Required;
    }
  }

  private convertCalvingHistory(calvingHistory: any[]): CalvingHistory[] {
    return calvingHistory.map((calving) => {
      return {
        averageGestation: calving.average_gestation,
        numberOfCalves: calving.number_of_calves,
      };
    });
  }

  private convertAiHistory(aiHistory: any[]): AI[] {
    return aiHistory.map((aiOccurence) => {
      return {
        aiDate: this.convertDate(aiOccurence.ai_date),
        bull: {
          // breed: aiOccurence.bull.breed,
          // name: aiOccurence.bull.name,
          tagNumber: aiOccurence.bull.tag_number,
        },
        heatDate: this.convertDate(aiOccurence.heat_date),
        sweeperBull: aiOccurence.sweeper_bull,
        year: aiOccurence.year,
        id: aiOccurence.id,
      };
    });
  }

  private convertDate(date: string) {
    return moment(date, 'YYYY-MM-D');
  }
}

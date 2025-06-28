import { Injectable } from '@angular/core';
import { AssistanceReason, CalvingAssistance } from '@cms-enums';
import {
  AI,
  IAnimal,
  AnimalWeight,
  IBull,
  CalvingHistory,
  CalvingStat,
  Dam,
  IMedication,
  ITreatment,
} from '@cms-interfaces';
import moment from 'moment';

@Injectable({
  providedIn: 'root',
})
export class MappingService {
  constructor() {}

  public importAnimalData(animalData: Object): IAnimal[] {
    let mappedAnimals: IAnimal[] = [];

    for (let value of Object.values<any>(animalData)) {
      mappedAnimals.push({
        tagNumber: value.tag_number,
        managementTag: value.management_tag.toUpperCase(),
        name: value.name,
        gender: value.sex,
        ai:
          value.ai_history.length === 0
            ? []
            : this.convertAiHistory(value.ai_history),
        birthDate: this.convertDate(value.birth_date),
        calvingHistory:
          value.calving_history.length === 0
            ? []
            : this.convertCalvingHistory(value.calving_history),
        calvingStat: value.calving_stat
          ? this.convertCalvingStats(value.calving_stat)
          : null,
        dam: this.convertDam(value.dam),
        sire: { tagNumber: value.sire.tag_number },
        weightData: this.convertWeightData(value.weight_data),
        notes: value.notes,
        breed: value.breed,
        registered: this.convertBoolean(value.registered),
        salePrice: value.sale_price || null
      });
    }

    return mappedAnimals;
  }

  public convertBulls(bullData: Object): IBull[] {
    const convertedBulls: IBull[] = [];
    for (let value of Object.values<any>(bullData)) {
      convertedBulls.push(this.convertBull(value));
    }
    return convertedBulls;
  }

  public convertBull(value: any): IBull {
    return {
      breed: value.breed,
      name: value.name,
      tagNumber: value.tag_number,
    };
  }

  public convertWeightData(
    weightData: any[],
    includeTag = false
  ): AnimalWeight[] {
    return weightData
      .map((weight) => {
        return includeTag
          ? { ...this.convertWeight(weight), tag: weight.animal_tag_number }
          : this.convertWeight(weight);
      })
      .sort((weightA: AnimalWeight, weightB: AnimalWeight) =>
        weightA.isSaleWeight && !weightB.isSaleWeight
          ? 1
          : !weightA.isSaleWeight && weightB.isSaleWeight
          ? -1
          : 0
      );
  }

  public convertWeight(weight: any): AnimalWeight {
    return {
      id: weight.id,
      weightDate: this.convertDate(weight.weight_date),
      isSaleWeight:
        weight.is_sale_weight === 1 || weight.is_sale_weight ? true : false,
      weight: weight.weight,
    };
  }

  public convertMedications(medications:any[]): IMedication[] {
    return medications.map(medication => this.convertSingleMedication(medication))
  }

  public convertSingleMedication(medication:any): IMedication {
    return {
      batchNumber: medication.batch_number,
      expiryDate: this.convertDate(medication.expiry_date),
      id: medication.id,
      name: medication.name,
      withdrawalPeriod: medication.withdrawal_period,
      createdAt: this.convertDate(medication.created_at)
    }
  }

  public convertTreatments(treatments: any[]):ITreatment[] {
    return treatments.map(treatment => this.convertSingleTreatment(treatment))
  }

  public convertSingleTreatment(treatment: any): ITreatment {
    return {
      id: treatment.id,
      administerer: treatment.administerer,
      treatmentStartDate: this.convertDate(treatment.treatment_start_date),
      treatmentEndDate: treatment.treatment_end_date ? this.convertDate(treatment.treatment_end_date) : undefined,
      medication: treatment.medication_id,
      treatmentGroup: treatment.treatment_group,
      createdAt: this.convertDate(treatment.created_at)
    }
  }

  private convertDam(dam: any): Dam {
    return {
      birthDate: this.convertDate(dam.birth_date),
      gender: dam.sex,
      managementTag: dam.management_tag.toUpperCase(),
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
          tagNumber: aiOccurence.bull.tag_number,
        },
        heatDate: this.convertDate(aiOccurence.heat_date),
        sweeperBull: this.convertBoolean(aiOccurence.sweeper_bull),
        year: aiOccurence.year,
        id: aiOccurence.id,
      };
    });
  }

  private convertDate(date: string, format:string = 'YYYY-MM-DD') {
    return moment(date, format);
  }
}

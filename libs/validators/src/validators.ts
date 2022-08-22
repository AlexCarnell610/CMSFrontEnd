import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';
import { Animal, AnimalWeight } from '@cms-interfaces';
import { AnimalBreedService } from '@cms-services';
import * as moment from 'moment';
import { WeightType } from 'src/app/components/modals/weight-modal/weight-modal.component';

export function breedValidator(breedService: AnimalBreedService): ValidatorFn {
  return (control: AbstractControl): ValidationErrors|null => {
    console.warn(control.errors);

    if(control.value?.length ===0 ){
      return null
    }
    
    return breedService.breedExists(control.value) ? null : {breed: true} 
  }
}

export const selectValidator: ValidatorFn = (control: FormControl) => {
  if (control.value !== 'invalid') {
    return null;
  } else {
    return {
      select: 'Select a value',
    };
  }
};

export function dateValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    if (moment().diff(moment(control.value), 'days', true) < 0) {
      return { date: true };
    } else {
      return null;
    }
  };
}

export function weighDateValidator(
  isAddMode: boolean,
  initialWeightType?: string
): ValidatorFn {
  return (formGroup: FormGroup): { [key: string]: any } | null => {
    const weightType = formGroup.get('weightType');
    const weightDate = formGroup.get('date');
    const animalControl = formGroup.get('animalControl');

    let output: { [key: string]: any } = null;
    if (
      weightType &&
      animalControl.value &&
      !dateAlreadyHasErrors(weightDate)
    ) {
      const weights = (animalControl.value as Animal).weightData;
      const intermediateWeights = getIntermediateWeights(weights);
      const saleWeight = getSaleWeight(weights);
      const initialWeight = getInitialWeight(weights);
      const inputDate = moment(weightDate.value);

      switch (weightType.value) {
        case WeightType.Sale:
          if (saleWeight !== undefined) {
            weightType.setErrors({ saleWeightExists: true });
          } else {
            if (initialWeight?.weightDate.isSameOrAfter(inputDate, 'day')) {
              weightDate.setErrors({
                saleAfterInitial: initialWeight.weightDate.format('DD/MM/YYYY'),
              });
            } else if (
              (isAddMode &&
                !afterIntermediateWeights(intermediateWeights, inputDate)) ||
              (!isAddMode &&
                !afterIntermediateWeights(intermediateWeights, inputDate) &&
                initialWeightType !== WeightType.Sale)
            ) {
              weightDate.setErrors({
                saleAfterInter:
                  intermediateWeights[
                    intermediateWeights.length - 1
                  ].weightDate.format('DD/MM/YYYY'),
              });
              weightDate.markAsDirty();
            } else if (!initialWeight) {
              weightType.setErrors({ noInitial: true });
            } else {
              weightDate.setErrors(null);
            }
          }
          break;
        case WeightType.Initial:
          if (
            initialWeight !== undefined &&
            initialWeightType !== WeightType.Initial
          ) {
            weightType.setErrors({ initialWeightExists: true });
          } else {
            if (saleWeight?.weightDate.isBefore(inputDate)) {
              weightDate.setErrors({
                initialBeforeSale: saleWeight.weightDate.format('DD/MM/YYYY'),
              });
            } else if (
              !beforeIntermediateWeights(intermediateWeights, inputDate)
            ) {
              weightDate.setErrors({
                initialBeforeInter:
                  intermediateWeights[0].weightDate.format('DD/MM/YYYY'),
              });
            } else {
              weightDate.setErrors(null);
            }
          }
          break;
        case WeightType.Intermediate:
          if (initialWeightType === WeightType.Initial) {
            weightType.setErrors({ noInitial: true });
          } else if (
            saleWeight &&
            initialWeight &&
            !inputDate.isBetween(
              initialWeight.weightDate,
              saleWeight.weightDate,
              'day',
              '()'
            )
          ) {
            if (
              isAddMode ||
              (!isAddMode && initialWeightType !== WeightType.Sale)
            ) {
              weightDate.setErrors({
                intermediateDate: {
                  initialDate: initialWeight.weightDate.format('DD/MM/YYYY'),
                  saleDate: saleWeight.weightDate.format('DD/MM/YYYY'),
                },
              });
            }
          } else if (!initialWeight) {
            weightType.setErrors({ noInitial: true });
          } else if (inputDate.diff(initialWeight.weightDate, 'day') <= 0) {
            weightDate.setErrors({
              interBeforeInitial: initialWeight.weightDate.format('DD/MM/YYYY'),
            });
          } else {
            weightDate.setErrors(null);
          }
          break;
        default:
          weightDate.setErrors(null);
          if (!weightDate.value) weightDate.markAsPristine();
          break;
      }
    } else {
      weightDate.setErrors(null);
    }
    return output;
  };
}

function getInitialWeight(weights: AnimalWeight[]): AnimalWeight | undefined {
  return weights.find((weight) => weight.weightType.isInitial);
}

function getSaleWeight(weights: AnimalWeight[]): AnimalWeight | undefined {
  return weights.find((weight) => weight.weightType.isSale);
}

function getIntermediateWeights(
  weights: AnimalWeight[]
): AnimalWeight[] | undefined {
  return weights.filter(
    (weight) => !weight.weightType.isInitial && !weight.weightType.isSale
  );
}

function afterIntermediateWeights(
  weights: AnimalWeight[],
  date: moment.Moment
): boolean {
  return weights.every((weight) => date.isAfter(weight.weightDate, 'day'));
}

function beforeIntermediateWeights(
  weights: AnimalWeight[],
  date: moment.Moment
): boolean {
  return weights.every((weight) => date.isBefore(weight.weightDate, 'day'));
}

function dateAlreadyHasErrors(dateControl: AbstractControl): boolean {
  return (
    (dateControl.errors?.required || dateControl.errors?.date) &&
    dateControl.dirty
  );
}

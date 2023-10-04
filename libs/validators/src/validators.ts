import {
  AbstractControl,
  UntypedFormControl,
  UntypedFormGroup,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';
import { IAnimal, AnimalWeight, Animal } from '@cms-interfaces';
import { AnimalBreedService } from '@cms-services';
import * as moment from 'moment';

export function breedValidator(breedService: AnimalBreedService): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (control.value?.length === 0) {
      return null;
    }

    return breedService.breedExists(control.value) ? null : { breed: true };
  };
}

export const selectValidator: ValidatorFn = (control: UntypedFormControl) => {
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

export function saleWeightValidator(isAddMode2: boolean): ValidatorFn {
  return (formGroup: UntypedFormGroup): { [key: string]: any } | null => {
    const animalControl = formGroup.get('animalControl');
    const isSaleWeightControl = formGroup.get('isSaleWeight');
    const weightDateControl = formGroup.get('date');
    const selectedWeight = formGroup.get('weightSelect').value;
    const isAddMode = selectedWeight === '';

    let output: { [key: string]: any } = null;

    if (animalControl.value && !dateAlreadyHasErrors(weightDateControl)) {
      let weights = (animalControl.value as IAnimal).weightData;
      const inputDate = moment(weightDateControl.value);
      if (!isAddMode) {
        weights = weights.filter((weight) => weight.id !== +selectedWeight);
      }
      if (isSaleWeightControl.value) {
        if (getSaleWeights(weights).length >= 1) {
          isSaleWeightControl.setErrors({ saleWeightExists: true });
        } else if (
          weights.length > 0 &&
          !saleWeightIsSameAsLastWeightOrAfter(weights, inputDate)
        ) {
          weightDateControl.setErrors({ saleWeightNotLast: true });
        }
      } else {
        if (weights.length > 0 && !newWeightBeforeSaleWeight(weights, inputDate) && getSaleWeights(weights).length > 0) {
          weightDateControl.setErrors({ newWeightAfterSaleWeight: true });
        }
      }
    }

    return null;
  };
}

function newWeightBeforeSaleWeight(
  weights: AnimalWeight[],
  inputDate: moment.Moment
): boolean {
  let sortedWeights = sortWeightsByDate(weights);
  return inputDate.isSameOrBefore(
    sortedWeights[sortedWeights.length - 1].weightDate,
    'day'
  );
}

function saleWeightIsSameAsLastWeightOrAfter(
  weights: AnimalWeight[],
  inputDate: moment.Moment
): boolean {
  let sortedWeights = sortWeightsByDate(weights);
  return inputDate.isSameOrAfter(
    sortedWeights[sortedWeights.length - 1].weightDate,
    'days'
  );
}

function getSaleWeights(weights: AnimalWeight[]): AnimalWeight[] {
  return weights.filter((weight) => weight.isSaleWeight);
}

function dateAlreadyHasErrors(dateControl: AbstractControl): boolean {
  return (
    (dateControl.errors?.required || dateControl.errors?.date) &&
    dateControl.dirty
  );
}

function sortWeightsByDate(weights: AnimalWeight[]): AnimalWeight[] {
  return [...weights].sort((weightA: AnimalWeight, weightB: AnimalWeight) =>
    weightA.weightDate.diff(weightB.weightDate)
  );
}

import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidatorFn,
} from '@angular/forms';
import { Animal, AnimalWeight } from '@cms-interfaces';
import * as moment from 'moment';

export function yes() {
  return 'ok';
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

export function weighDateValidator(): ValidatorFn {
  return (formGroup: FormGroup): { [key: string]: any } | null => {
    const weightType = formGroup.get('weightType');
    const weightDate = formGroup.get('date');
    const weightSelect = formGroup.get('weightSelect');
    const animalControl = formGroup.get('animalControl');

    weightDate.setErrors(null);
    let output: { [key: string]: any } = null;
    if (weightType && weightDate.value && animalControl.value) {
      const weights = (animalControl.value as Animal).weightData;
      const intermediateWeights = getIntermediateWeights(weights);
      const saleWeight = getSaleWeight(weights);
      const initialWeight = getInitialWeight(weights);
      const inputDate = moment(weightDate.value);

      switch (weightType.value) {
        case 'isSale':
          if (saleWeight !== undefined && weightSelect.disabled) {
            weightType.setErrors({ saleWeightExists: true });
          } else {
            if (
              getInitialWeight(weights)?.weightDate.isSameOrAfter(
                inputDate,
                'day'
              )
            ) {
              weightDate.setErrors({
                saleAfterInitial: initialWeight.weightDate.format('DD/MM/YYYY'),
              });
            } else if (
              !afterIntermediateWeights(intermediateWeights, inputDate)
            ) {
              weightDate.setErrors({
                saleAfterInter: intermediateWeights[
                  intermediateWeights.length - 1
                ].weightDate.format('DD/MM/YYYY'),
              });
            } else if (!initialWeight) {
              weightType.setErrors({ noInitial: true });
            } else {
              weightDate.setErrors(null);
            }
          }
          break;
        case 'isInitial':
          if (initialWeight !== undefined && weightSelect.disabled) {
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
                initialBeforeInter: intermediateWeights[0].weightDate.format(
                  'DD/MM/YYYY'
                ),
              });
            } else {
              weightDate.setErrors(null);
            }
          }
          break;
        case 'isIntermediate':
          if (
            saleWeight &&
            initialWeight &&
            !inputDate.isBetween(
              initialWeight.weightDate,
              saleWeight.weightDate,
              'day',
              '()'
            )
          ) {
            weightDate.setErrors({
              intermediateDate: {
                initialDate: initialWeight.weightDate.format('DD/MM/YYYY'),
                saleDate: saleWeight.weightDate.format('DD/MM/YYYY'),
              },
            });
          } else if (!initialWeight) {
            weightType.setErrors({ noInitial: true });
          }
          break;
        default:
          break;
      }
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

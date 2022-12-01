import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Modals } from '@cms-enums';
import { Animal } from '@cms-interfaces';
import { RootState } from '@cms-ngrx';
import { selectAnimals } from '@cms-ngrx/animal';
import { Store } from '@ngrx/store';
import * as moment from 'moment';

interface IBulkWeight {
  id: string;
  weight: string;
  date: Date;
}
@Component({
  selector: 'cms-bulk-weight-modal',
  templateUrl: './bulk-weight-modal.component.html',
  styleUrls: ['./bulk-weight-modal.component.scss'],
})
export class BulkWeightModalComponent implements OnInit {
  selectedFile: File;
  identifier = Modals.BulkWeightModal;
  bulkWeightForm: FormGroup;
  correctWeights: IBulkWeight[];
  notFoundWeights: IBulkWeight[];

  constructor(
    private fb: FormBuilder,
    private readonly store: Store<RootState>
  ) {}

  ngOnInit(): void {
    this.bulkWeightForm = this.fb.group({
      inputFile: [null, Validators.required],
    });
  }

  checkFile(): void {
    if (this.selectedFile) {
      let fileReader = new FileReader();
      this.store.select(selectAnimals).subscribe((animals) => {
        fileReader.onload = (e) => {
          const weightData: string = fileReader.result as string;
          const weightDataArray: string[] = weightData.split('\r\n');

          console.warn(weightDataArray.shift());
          console.log(weightDataArray);
          weightDataArray.pop();
          const mappedWeights = weightDataArray.map((weight) => {
            const currWeight = weight.split(',');

            const newWeight: IBulkWeight = {
              id: currWeight[0],
              weight: currWeight[1],
              date: moment(
                `${currWeight[3]},${currWeight[4]}`,
                'DD/MM/yyyy,HH:mm:SS'
              ).toDate(),
            };
            return newWeight;
          });
          console.warn(mappedWeights);

          this.correctWeights = mappedWeights.filter(
            (weight) => this.getAnimalIndex(weight, animals) > -1
          );
          
          this.correctWeights.forEach(
            (weight) =>
              (weight.id = animals.find((animal) =>
                animal.tagNumber.endsWith(weight.id)
              ).tagNumber)
          );

          if (this.correctWeights.length < mappedWeights.length) {
            this.notFoundWeights = mappedWeights.filter(
              (weight) => this.getAnimalIndex(weight, animals) === -1
            );
          }

          if (this.notFoundWeights?.length > 0) {
            console.warn(
              'Following tag numbers were not found',
              this.notFoundWeights
            );
            console.warn(
              'Do you still want to add these weights?',
              this.correctWeights
            );
          }
        };
      });
      fileReader.readAsText(this.selectedFile);
    }
  }

  fileChange(file) {
    console.warn(file);
  }

  get labelText(): string {
    return this.selectedFile?.name || 'Choose File...';
  }

  get fileName(): string {
    return (this.fileInputControl.value as string).split('\\')[2];
  }

  get fileInputControl(): AbstractControl {
    return this.bulkWeightForm.get('inputFile');
  }

  getAnimalIndex(weight: IBulkWeight, animals: Animal[]): number {
    return animals.findIndex((animal) => animal.tagNumber.endsWith(weight.id));
  }

  mapToTagAndWeight(weights: IBulkWeight[]): { tag: string; weight: string }[] {
    return weights.map((weight) => {
      return { tag: weight.id, weight: weight.weight };
    });
  }
}

import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Modals } from '@cms-enums';
import * as moment from 'moment'

interface IBulkWeight {
  id: string,
  weight: string,
  date: Date
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

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.bulkWeightForm = this.fb.group({
      inputFile: [null, Validators.required],
    });
  }

  checkFile(): void {
    if (this.selectedFile) {
      let fileReader = new FileReader();
      fileReader.onload = (e) => {
        const weightData: string = fileReader.result as string
        const weightDataArray: string[]  = weightData.split("\r\n")
        

        console.warn(weightDataArray.shift())
        console.log(weightDataArray);
        const mappedWeights = weightDataArray.map(weight => {
          const currWeight = weight.split(",")

          const newWeight: IBulkWeight = {
            id: currWeight[0],
            weight: currWeight[1],
            date: moment(`${currWeight[3]},${currWeight[4]}`, "DD/MM/yyyy,HH:mm:SS").toDate()
          }
          return newWeight
        })

        console.log(mappedWeights);
      };
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
}

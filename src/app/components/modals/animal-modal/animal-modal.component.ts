import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Animal } from '@cms-interfaces';

@Component({
  selector: 'cms-animal-modal',
  templateUrl: './animal-modal.component.html',
  styleUrls: ['./animal-modal.component.css']
})
export class AnimalModalComponent implements OnInit {

  @Input() animal: Animal = null;
  @Input() isAddMode: boolean;
  public animalForm: FormGroup = new FormGroup({});

  constructor(private readonly fb: FormBuilder) { }

  ngOnInit(): void {
    this.animalForm = this.fb.group({
      gender: this.fb.control([]),
      dob: this.fb.control([]),
      dam: this.fb.control([]),
      sire: this.fb.control([])
    })

  }

}

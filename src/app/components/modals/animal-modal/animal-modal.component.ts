import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Animal } from '@cms-interfaces';
import { RootState } from '@cms-ngrx';
import { getDams } from '@cms-ngrx/animal';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'cms-animal-modal',
  templateUrl: './animal-modal.component.html',
  styleUrls: ['./animal-modal.component.css']
})
export class AnimalModalComponent implements OnInit {

  @Input() animal: Animal = null;
  @Input() isAddMode: boolean;
  public animalForm: FormGroup = new FormGroup({});
  public $dams: Observable<Animal[]>;

  constructor(private readonly fb: FormBuilder, private readonly store: Store<RootState>) { }

  ngOnInit(): void {
    this.animalForm = this.fb.group({
      gender: this.fb.control([]),
      dob: this.fb.control([]),
      dam: this.fb.control([]),
      sire: this.fb.control([])
    })
    this.$dams = this.store.pipe(select(getDams));
  }

}

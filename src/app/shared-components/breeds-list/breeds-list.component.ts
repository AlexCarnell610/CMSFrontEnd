import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, UntypedFormGroup } from '@angular/forms';
import { IBreedCode } from '@cms-interfaces';
import { AnimalBreedService } from '@cms-services';

@Component({
    selector: 'cms-breeds-list',
    templateUrl: './breeds-list.component.html',
    styleUrls: ['./breeds-list.component.scss'],
    standalone: false
})
export class BreedsListComponent implements OnInit {

  @Input()form: UntypedFormGroup
  @Input() controlName = "breed";
  public breeds: IBreedCode[] = [];

  constructor(private readonly breedService: AnimalBreedService) { }

  ngOnInit(): void {
    this.breeds = this.breedService.breedCodeObjects;
  }

  public getCSSForBreed(): string {
    if (this.breed.invalid && this.breed.dirty) {
      return 'is-invalid';
    } else if (this.breed.valid && this.breed.dirty) {
      return 'is-valid';
    }
  }

  public get breed(): AbstractControl {
    return this.form.get(this.controlName);
  }

}

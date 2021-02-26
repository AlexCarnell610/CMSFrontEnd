import { Injectable } from '@angular/core';
import { IBreedCode } from '@cms-interfaces';
import * as CattleBreedCodes from '../../../../src/assets/cattleBreedCodes.json';

@Injectable({
  providedIn: 'root',
})
export class AnimalBreedService {
  private _breedMap: Map<string, string> = new Map();
  private _breedObjectList: IBreedCode[] = [];
  constructor() {
    const breeds = (CattleBreedCodes as any).default;
    for (let breed in breeds) {
      this._breedMap.set(breeds[breed].code, breeds[breed].breed + ' ');
    }

    this._breedMap.forEach((value: string, key: string) => {
      this._breedObjectList.push({ breed: value, code: key });
    });
  }

  public getBreedFromCode(breed: string) {
    return this._breedMap.get(breed);
  }

  public getCodeFromBreed(searchBreed: string) {
    return this.breedCodes[
      this.breeds.findIndex((breed) => breed === searchBreed.toUpperCase())
    ];
  }

  public breedExists(breedCodeOrName: string): boolean {
    const codeOrNameUpper = breedCodeOrName?.toString().toUpperCase();
    return (
      this.getBreedFromCode(codeOrNameUpper) !== undefined ||
      this.breeds.findIndex((breed) => breed === codeOrNameUpper) !== -1
    );
  }

  public getBreedCode(breed: string) {
    if (this.getBreedFromCode(breed) !== undefined) {
      return breed;
    } else {
      return this.getCodeFromBreed(breed);
    }
  }

  get breedCodes() {
    return Array.from(this._breedMap.keys());
  }

  get breeds() {
    return Array.from(this._breedMap.values());
  }

  get breedCodeObjects(): IBreedCode[] {
    return this._breedObjectList;
  }
}

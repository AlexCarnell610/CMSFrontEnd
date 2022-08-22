import { Injectable } from '@angular/core';
import { IBreedCode } from '@cms-interfaces';
import * as CattleBreedCodes from '../../../src/assets/cattleBreedCodes.json';

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
      this._breedObjectList.push({ breed: value.trim(), code: key });
    });
  }

  public getBreedFromCode(breed: string) {
    return this._breedMap.get(breed?.toUpperCase());
  }

  public getCodeFromBreed(searchBreed: string) {
    return this.breedCodes[
      this.breeds.findIndex(
        (breed) => breed.trim() === searchBreed.toUpperCase().trim()
      )
    ];
  }

  public breedExists(breedCodeOrName: string): boolean {
    const codeOrNameUpper = breedCodeOrName?.toString().toUpperCase().trim();
    return (
      this.getBreedFromCode(codeOrNameUpper) !== undefined ||
      this.breeds.findIndex((breed) => breed === codeOrNameUpper) !== -1
    );
  }

  public getBreedCode(breed: string) {
    if (this.getBreedFromCode(breed.trim()) !== undefined) {
      return breed;
    } else {
      return this.getCodeFromBreed(breed.trim());
    }
  }

  public isBreedCode(breed: string): boolean {
    return this._breedMap.get(breed.toUpperCase()) !== undefined;
  }

  get breedCodes() {
    return Array.from(this._breedMap.keys());
  }

  get breeds() {
    return Array.from(this._breedMap.values()).map((breed) => breed.trim());
  }

  get breedCodeObjects(): IBreedCode[] {
    return this._breedObjectList;
  }
}

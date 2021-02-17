import { Injectable } from '@angular/core';
import * as CattleBreedCodes from '../../../../src/assets/cattleBreedCodes.json';

interface IBreedCode {
  breed: string;
  code: string;
}

@Injectable({
  providedIn: 'root',
})
export class AnimalBreedService {
  private _breedMap: Map<string, string> = new Map();
  private _breedObjectList: IBreedCode[] = [];
  constructor() {
    const breeds = (CattleBreedCodes as any).default;
    for (let breed in breeds) {
      this._breedMap.set(breeds[breed].code, breeds[breed].breed);
    }

    this._breedMap.forEach((value: string, key: string) => {
      this._breedObjectList.push({ breed: value, code: key });
    });
  }

  public getBreedFromCode(breed: string) {
    return this._breedMap.get(breed);
  }

  public breedExists(breedCodeOrName: string): boolean {
    const codeOrNameUpper = breedCodeOrName?.toString().toUpperCase();
    return (
      this.getBreedFromCode(codeOrNameUpper) !== undefined ||
      this.breeds.findIndex((breed) => breed === codeOrNameUpper) !== -1
    );
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

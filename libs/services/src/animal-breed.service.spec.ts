import { AnimalBreedService } from './animal-breed.service';

describe('AnimalBreedService', () => {
  let service: AnimalBreedService;

  beforeEach(() => {
    service = new AnimalBreedService();
  });

  it('should create the serivce', () => {
    expect(service).toBeTruthy();
  });

  it('should populate the breed object array', () => {
    expect(service.breedCodeObjects.length).toBeGreaterThan(0);
  });

  it('should return the breed given a valid breed code', () => {
    let breed = 'LIM';
    expect(service.breedExists(breed)).toBeTrue();
    expect(service.getBreedFromCode(breed).toLowerCase().trim()).toEqual(
      'limousin'
    );
  });

  it('should get the breed code given a valid breed', () => {
    let breed = 'limousin';
    expect(service.breedExists(breed)).toBeTrue();
    expect(service.getCodeFromBreed(breed).toLowerCase()).toEqual('lim');
  });

  it('Should return true if breed exists', () => {
    expect(service.breedExists('LIM')).toBeTrue();
  });

  it('Should return false if the breed does not exist', () => {
    expect(service.breedExists('DOESNT EXIST')).toBeFalse();
  });

  it('Should return the breed code given either a breed or breed code', () => {
    let breedCode = 'AA';
    let breed = 'YAK';
    expect(service.getBreedCode(breedCode)).toEqual(breedCode);
    expect(service.getBreedCode(breed)).toEqual('YK');
  });

  it('should return true if string is a breedcode false other wise', () => {
    let breed = 'Limousin';
    let breedCode = 'AAX';

    expect(service.isBreedCode(breed)).toBeFalse();
    expect(service.isBreedCode(breedCode)).toBeTrue();
  });

  it('Should return an array of breed codes', () => {
    expect(
      service.breedCodes.every((code) => service.isBreedCode(code))
    ).toBeTrue();
  });

  it('Should return an array of breeds', () => {
    expect(
      service.breeds.every(
        (breed) => service.getCodeFromBreed(breed) !== undefined
      )
    ).toBeTrue();
  });

  it('should return a list of breed code objects', () => {
    let breedCodeObjects = service.breedCodeObjects;
    let expectation = breedCodeObjects.every((object) => {
      return (
        service.isBreedCode(object.code) &&
        service.getCodeFromBreed(object.breed)
      );
    });

    expect(expectation).toBeTrue();
  });
});

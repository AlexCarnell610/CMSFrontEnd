import { AssistanceReason, CalvingAssistance } from '@cms-enums';
import { Animal, Bull } from '@cms-interfaces';
import { convertedAnimal, rawAnimal } from '@cms-testing-data';
import { MappingService } from './importData.service';

fdescribe('Import data service', () => {
  let service: MappingService;

  beforeEach(() => {
    service = new MappingService();
  });

  it('Should compile', () => {
    expect(service).toBeTruthy();
  });

  describe('importAnimalData [method]', () => {
    beforeEach(() => {});
    it('Should convert animal data to an animal object', () => {
      expect(service.importAnimalData(rawAnimal)).toEqual([convertedAnimal]);
    });

    it('should return empty array for ai history if animal has none', () => {
      let noAiHistAnimal = [{ ...rawAnimal[0], ai_history: [] }];
      let expectation: Animal[] = [{ ...convertedAnimal, ai: [] }];

      expect(service.importAnimalData(noAiHistAnimal)).toEqual(expectation);
    });

    it('should return empty array if no calving history', () => {
      let noCalvingHistAnimal = [{ ...rawAnimal[0], calving_history: [] }];
      let expectation: Animal[] = [{ ...convertedAnimal, calvingHistory: [] }];

      expect(service.importAnimalData(noCalvingHistAnimal)).toEqual(
        expectation
      );
    });
  });

  describe('convert calving assistance', () => {
    it('should set none calving assistance', () => {
      let noCalvingAssistanceAnimal = [
        {
          ...rawAnimal[0],
          calving_stat: { ...rawAnimal[0].calving_stat, assistance: 'n' },
        },
      ];
      let expectaction: Animal[] = [
        {
          ...convertedAnimal,
          calvingStat: {
            ...convertedAnimal.calvingStat,
            assistance: CalvingAssistance.None,
          },
        },
      ];

      expect(service.importAnimalData(noCalvingAssistanceAnimal)).toEqual(
        expectaction
      );
    });

    it('should set required calving assistance', () => {
      let assisstanceRequiredAnimal = [
        {
          ...rawAnimal[0],
          calving_stat: { ...rawAnimal[0].calving_stat, assistance: 'r' },
        },
      ];
      let expectaction: Animal[] = [
        {
          ...convertedAnimal,
          calvingStat: {
            ...convertedAnimal.calvingStat,
            assistance: CalvingAssistance.Required,
          },
        },
      ];

      expect(service.importAnimalData(assisstanceRequiredAnimal)).toEqual(
        expectaction
      );
    });

    it('should set vet required calving assistance', () => {
      let vetCalvingAssistanceAnimal = [
        {
          ...rawAnimal[0],
          calving_stat: { ...rawAnimal[0].calving_stat, assistance: 'v' },
        },
      ];
      let expectaction: Animal[] = [
        {
          ...convertedAnimal,
          calvingStat: {
            ...convertedAnimal.calvingStat,
            assistance: CalvingAssistance.Vet,
          },
        },
      ];

      expect(service.importAnimalData(vetCalvingAssistanceAnimal)).toEqual(
        expectaction
      );
    });

    it('should set na assistance reason', () => {
      let naAssistanceReasonAnimal = [
        {
          ...rawAnimal[0],
          calving_stat: { ...rawAnimal[0].calving_stat, assist_reason: null },
        },
      ];
      let expectaction: Animal[] = [
        {
          ...convertedAnimal,
          calvingStat: {
            ...convertedAnimal.calvingStat,
            assistanceReason: [AssistanceReason.NA],
          },
        },
      ];

      expect(service.importAnimalData(naAssistanceReasonAnimal)).toEqual(
        expectaction
      );
    });

    it('should set array of assistance reason if more than one', () => {
      let bigCalfAndPoorPresAnimal = [
        {
          ...rawAnimal[0],
          calving_stat: {
            ...rawAnimal[0].calving_stat,
            assist_reason: 'pp-bc',
          },
        },
      ];
      let expectaction: Animal[] = [
        {
          ...convertedAnimal,
          calvingStat: {
            ...convertedAnimal.calvingStat,
            assistanceReason: [
              AssistanceReason.PoorPresentation,
              AssistanceReason.BigCalf,
            ],
          },
        },
      ];

      expect(service.importAnimalData(bigCalfAndPoorPresAnimal)).toEqual(
        expectaction
      );
    });

    it('should set na assistance reason if not valid', () => {
      let invalidAssistanceReason = [
        {
          ...rawAnimal[0],
          calving_stat: {
            ...rawAnimal[0].calving_stat,
            assist_reason: 'notValid',
          },
        },
      ];
      let expectaction: Animal[] = [
        {
          ...convertedAnimal,
          calvingStat: {
            ...convertedAnimal.calvingStat,
            assistanceReason: [AssistanceReason.NA],
          },
        },
      ];

      expect(service.importAnimalData(invalidAssistanceReason)).toEqual(
        expectaction
      );
    });
  });

  describe('convertBulls [method]', () => {
    let rawBull, convertedBull: Bull;
    beforeEach(() => {
      rawBull = {
        breed: 'LIM',
        name: 'Bob',
        tag_number: 'UK12345',
      };

      convertedBull = {
        breed: rawBull.breed,
        name: rawBull.name,
        tagNumber: rawBull.tag_number,
      };
    });

    it('Should convert the bull array', () => {
      expect(service.convertBulls([rawBull])).toEqual([convertedBull]);
    });
  });
});

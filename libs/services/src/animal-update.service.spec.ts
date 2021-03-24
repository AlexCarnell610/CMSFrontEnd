import {
  AddAnimal,
  AddAnimalWeight,
  UpdateAnimal,
  UpdateAnimalWeight,
} from '@cms-ngrx/animal';
import { mockAnimal } from '@cms-testing-data';
import { of } from 'rxjs';
import { AnimalUpdateService } from './animal-update.service';

fdescribe('AnimalUpdateService', () => {
  let service: AnimalUpdateService, mockHttpService, mockStore;
  let updateWeightSpy, dispatchSpy, mockWeightUpdate, mockWeightID;

  beforeEach(() => {
    mockWeightID = 12;
    mockWeightUpdate = { weight: 123, date: 'whenever' };
    mockHttpService = {
      updateWeight: () => {
        return of(mockAnimal.weightData);
      },
      addWeight: () => {
        return of(mockAnimal.weightData);
      },
      addAnimal: () => {
        return of(mockAnimal);
      },
      updateAnimal: () => {
        return of(mockAnimal);
      },
    };
    mockStore = {
      dispatch: () => {},
    };

    service = new AnimalUpdateService(mockHttpService, mockStore);
    dispatchSpy = spyOn(mockStore, 'dispatch');
    updateWeightSpy = spyOn(mockHttpService, 'updateWeight').and.callThrough();
  });
  it('should create', () => {
    expect(service).toBeTruthy();
  });

  it('should send an update request', () => {
    service.updateAnimalWeight(mockWeightID, mockWeightUpdate, mockAnimal, 12);
    expect(updateWeightSpy).toHaveBeenCalledWith(
      mockWeightID,
      mockWeightUpdate
    );
    expect(dispatchSpy).toHaveBeenCalledWith(
      new UpdateAnimalWeight({
        weightUpdate: {
          id: mockAnimal.tagNumber,
          changes: { weightData: mockAnimal.weightData },
        },
      })
    );
  });

  it('should send add animal request', () => {
    let addWeightSpy = spyOn(mockHttpService, 'addWeight').and.callThrough();
    service.addAnimalWeight(mockAnimal.tagNumber, mockAnimal.weightData[0]);

    expect(addWeightSpy).toHaveBeenCalledWith(
      mockAnimal.tagNumber,
      mockAnimal.weightData[0]
    );
    expect(dispatchSpy).toHaveBeenCalledWith(
      new AddAnimalWeight({
        newWeight: {
          id: mockAnimal.tagNumber,
          changes: { weightData: mockAnimal.weightData },
        },
      })
    );
  });

  it('should send add animal request', () => {
    let addAnimalSpy = spyOn(mockHttpService, 'addAnimal').and.callThrough();
    service.addAnimal(mockAnimal);
    expect(addAnimalSpy).toHaveBeenCalledWith(mockAnimal);
    expect(dispatchSpy).toHaveBeenCalledWith(
      new AddAnimal({ animal: mockAnimal })
    );
  });
  it('should send update animal request', () => {
    let updateAnimalSpy = spyOn(
      mockHttpService,
      'updateAnimal'
    ).and.callThrough();
    service.updateAnimal(mockAnimal.tagNumber, mockAnimal);
    expect(updateAnimalSpy).toHaveBeenCalledWith(
      mockAnimal.tagNumber,
      mockAnimal
    );
    expect(dispatchSpy).toHaveBeenCalledWith(
      new UpdateAnimal({ id: mockAnimal.tagNumber, changes: mockAnimal })
    );
  });
});

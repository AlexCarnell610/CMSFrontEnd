import { ICullUpdate } from '@cms-interfaces';
import { CullUpdateService } from './cull-update.service';

describe('CullUpdateService', () => {
  let service: CullUpdateService,
    mockUpdate,
    tagNumber,
    convertedUpdate: ICullUpdate;

  beforeEach(() => {
    mockUpdate = {
      tagNumber: {
        score: 123,
        age: 3,
        aliveCalves: 1,
        calfAvgDailyWeightGain: 0.9,
        calvesCount: 1,
      },
    };

    convertedUpdate = {
      age: mockUpdate.tagNumber.age,
      tagNumber: 'tagNumber',
      calfDailyWeightGain: mockUpdate.tagNumber.calfAvgDailyWeightGain,
      totalCalves: mockUpdate.tagNumber.calvesCount,
      score: mockUpdate.tagNumber.score,
      aliveCalves: mockUpdate.tagNumber.calvesCount,
    };
    service = new CullUpdateService();
  });

  it('Should create the service', () => {
    expect(service).toBeTruthy();
  });

  it('should set the cull update', () => {
    service.cullUpdate = mockUpdate;
    expect(service.getCullUpdate().value).toEqual([convertedUpdate]);
  });

  it('should set default values if they are not present', () => {
    let nullUpdate = {
      tagNumber: {
        ...mockUpdate.tagNumber,
        score: undefined,
        aliveCalves: undefined,
        calvesCount: undefined,
        calfAvgDailyWeightGain: undefined,
      },
    };
    let nullConverted: ICullUpdate = {
      ...convertedUpdate,
      aliveCalves: null,
      score: null,
      totalCalves: 0,
      calfDailyWeightGain: null,
    };
    service.cullUpdate = nullUpdate;
    expect(service.getCullUpdate().value).toEqual([nullConverted]);
  });

  it('should not send a new update if update is error', () => {
    let nextSpy = spyOn<any>(service['_cullUpdate'], 'next');
    service.cullUpdate = 'error';
    expect(nextSpy).not.toHaveBeenCalled();
  });
});

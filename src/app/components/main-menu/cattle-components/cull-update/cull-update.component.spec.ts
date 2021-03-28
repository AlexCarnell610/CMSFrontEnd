import { fakeAsync, tick } from '@angular/core/testing';
import { ICullUpdate } from '@cms-interfaces';
import { convertedAnimal, mockAnimal } from '@cms-testing-data';
import { of } from 'rxjs';
import { CullUpdateComponent } from './cull-update.component';

fdescribe('CullUpdateComponent', () => {
  let component: CullUpdateComponent,
    mockCullUpdateService,
    mockRouter,
    mockStore,
    mockScreenService,
    mockCullUpdate: ICullUpdate;

  beforeEach(() => {
    mockCullUpdate = {
      age: 3,
      score: 5,
      tagNumber: 'TAGNUMBER',
      aliveCalves: 3,
      calfDailyWeightGain: 0.9,
      totalCalves: 4,
    };

    mockCullUpdateService = {
      getCullUpdate: () => {
        return [mockCullUpdate];
      },
    };
    mockRouter = { navigate: () => {} };
    mockScreenService = {
      isSmallScreenObs: () => {
        return of(true);
      },
    };

    mockStore = {
      pipe: () => {},
    };

    component = new CullUpdateComponent(
      mockCullUpdateService,
      mockRouter,
      mockStore,
      mockScreenService
    );
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOninit [method]', () => {
    beforeEach(() => {
      component.selectedCullUpdate = mockCullUpdate;
    });
    it('should set the chart options', () => {
      expect(component.weightChartOptions).toBeUndefined();
      component.ngOnInit();
      expect(component.weightChartOptions.responsive).toBeTrue();
      expect(component.weightChartOptions.tooltips.custom).toBeDefined();
    });

    it('should set the aliveVSDead data and labels', () => {
      component.ngOnInit();
      component.$calves.next([convertedAnimal]);
      component.$selectedAnimal.next(mockAnimal);

      expect(component.aliveVSDeadData).toEqual([
        {
          data: [
            mockCullUpdate.aliveCalves,
            mockCullUpdate.totalCalves - mockCullUpdate.aliveCalves,
          ],
          label: 'Calves',
        },
      ]);

      expect(component.aliveVSDeadLabels).toEqual([
        'Number alive calves',
        'Number dead calves',
      ]);
    });

    it('should set the chartweights', fakeAsync(() => {
      component.ngOnInit();
      component.$calves.next([convertedAnimal]);
      component.$selectedAnimal.next(mockAnimal);
      tick();
      let convertedWeight = convertedAnimal.weightData;
      expect(component.chartWeights).toEqual([
        {
          data: [
            {
              x: convertedWeight[0].weightDate.format('L'),
              y: convertedWeight[0].weight,
            },
            {
              x: convertedWeight[1].weightDate.format('L'),
              y: convertedWeight[1].weight,
            },
          ],
          label: convertedAnimal.tagNumber,
        },
      ]);
    }));

    it('should set the cull update', () => {
      component.ngOnInit();
      expect(component.cullUpdate).toEqual([mockCullUpdate]);
    });

    it('should set the small screen value', () => {
      component.ngOnInit();
      expect(component.isSmallScreen).toBeTrue();
    });
  });

  describe('animalSelected [method]', () => {
    beforeEach(() => {
      spyOn(mockStore, 'pipe').and.returnValues(
        of(convertedAnimal),
        of([convertedAnimal])
      );
      component.animalSelected(mockCullUpdate);
    });

    it('should set the selected animal and the calves', () => {
      expect(component.$selectedAnimal.value).toEqual(convertedAnimal);
      expect(component.$calves.value).toEqual([convertedAnimal]);
    });
  });

  describe('back to main [method]', () => {
    it('should naviaget to main menu', () => {
      let navSpy = spyOn(mockRouter, 'navigate');
      component.backToMain();
      expect(navSpy).toHaveBeenCalled();
    });
  });

  describe('ngOndestroy', () => {
    let unsubscribeSpy;
    beforeEach(() => {
      unsubscribeSpy = spyOn<any>(component['subs'], 'unsubscribe');
    });
    it('should call unsubscribe', () => {
      component.ngOnDestroy();
      expect(unsubscribeSpy).toHaveBeenCalledTimes(1);
    });
  });
});

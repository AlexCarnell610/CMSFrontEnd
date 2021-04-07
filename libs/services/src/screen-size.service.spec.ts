import { ScreenSizeService } from './screen-size.service';

describe('ScreenSizeService', () => {
  let service: ScreenSizeService;

  beforeEach(() => {
    service = new ScreenSizeService();
  });

  it('Should be able to set and get screenwidth', () => {
    service.screenWidth = 100;
    expect(service.screenWidth).toEqual(100);
  });

  it('should return true if the screensize is below the threshold', () => {
    service.screenWidth = 100;
    expect(service.isSmallScreen).toBeTrue();
  });

  it('should return false if the the screensize is above the threshold', () => {
    service.screenWidth = 2000;
    expect(service.isSmallScreen).toBeFalse();
  });

  it('should return observable with isSmallScreen value', (done) => {
    let isFirst = true;
    service.isSmallScreenObs().subscribe((isSmall) => {
      if (isFirst) {
        expect(isSmall).toBeTrue();
      } else {
        expect(isSmall).toBeFalse();
        done();
      }
    });

    service.screenWidth = 100;
    isFirst = false;
    service.screenWidth = 2000;
  });
});

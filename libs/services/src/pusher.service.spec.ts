import { PusherService } from './pusher.service';

describe('PusherService', () => {
  let service: PusherService;

  beforeEach(() => {
    service = new PusherService();
  });

  it('should compile', () => {
    expect(service).toBeTruthy();
  });

  it('should be able to bind to the channel', () => {
    expect(service.channel.bind).toBeTruthy();
  });
});

import { Injectable } from '@angular/core';
import Pusher, { Channel } from 'pusher-js';
import { environment } from '../../../src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PusherService {
  private _pusher: Pusher;
  private _channel: Channel;

  constructor() {
    this._pusher = new Pusher(environment.pusher.key, {
      cluster: environment.pusher.cluster,
    });
    this._channel = this._pusher.subscribe('cull-update');
  }

  get channel(): Channel {
    return this._channel;
  }
}

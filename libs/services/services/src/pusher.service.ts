import { Injectable } from '@angular/core';
import Pusher from 'pusher-js';
import { environment } from '../../../../src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PusherService {
  pusher: any;
  channel: any;

  constructor() {
    this.pusher = new Pusher(environment.pusher.key, {
      cluster: environment.pusher.cluster,
    });
    this.channel = this.pusher.subscribe('cull-update');
  }
}

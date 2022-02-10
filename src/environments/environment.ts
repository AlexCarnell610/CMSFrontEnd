// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
import { PageURLs } from '@cms-enums';
import * as authConf from '../../auth_config.json';
export const environment = {
  production: false,
  auth: {
    domain: authConf.domain,
    clientId: authConf.clientId,
    redirectUri: `https://${window.location.host}/${PageURLs.Login}`,
    audience: authConf.audience,
  },
  pusher: {
    key: '2c99d4674e8e6f7e2397',
    cluster: 'eu',
  },
  api: '/devApi',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.

import { PageURLs } from '@cms-enums';
import * as authConf from '../../auth_config.json';
export const environment = {
  production: false,
  auth: {
    domain: authConf.domain,
    clientId: authConf.clientId,
    redirectUri: `https://${window.location.host}/CMSFrontEnd/${PageURLs.Login}`,
    audience: authConf.audience,
  },
  pusher: {
    key: '2c99d4674e8e6f7e2397',
    cluster: 'eu',
  },
  api: '/api',
};

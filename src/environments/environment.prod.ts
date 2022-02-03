import { PageURLs } from '@cms-enums';
import { audience, clientId, domain } from '../../auth_config.json';
export const environment = {
  production: true,
  auth: {
    domain,
    clientId,
    redirectUri: `https://${window.location.host}/${PageURLs.Login}`,
    audience,
  },
  pusher: {
    key: '2c99d4674e8e6f7e2397',
    cluster: 'eu',
  },
  api: '/api',
};

import { PageURLs } from '@cms-enums';
export const environment = {
  production: true,
  auth: {
    domain: 'cattle-management-system.eu.auth0.com',
    clientId: 'HkkCv3GXyrOhjDwK4y7evcP757A22BPS',
    redirectUri: `https://${window.location.host}/CMSFrontEnd/${PageURLs.Login}`,
    audience: 'https://cmsBackend.com',
  },
  pusher: {
    key: '2c99d4674e8e6f7e2397',
    cluster: 'eu',
  },
  api: '/api',
};

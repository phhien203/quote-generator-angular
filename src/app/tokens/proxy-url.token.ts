import { InjectionToken } from '@angular/core';

export const PROXY_URL = new InjectionToken<string>(
  'URL of proxy server to bypass CORS issue',
  {
    factory: () => {
      return 'https://sheltered-river-42247.herokuapp.com/';
    },
  }
);

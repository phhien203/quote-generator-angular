import { InjectionToken } from '@angular/core';

export const QUOTE_API_URL = new InjectionToken<string>('URL of quote API', {
  factory: () => {
    return 'https://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
  },
});

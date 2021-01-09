import { InjectionToken } from '@angular/core';
import { QuoteService } from '../services/quote/quote.service';

export const QUOTE_SERVICE = new InjectionToken<QuoteService>('Quote Service');

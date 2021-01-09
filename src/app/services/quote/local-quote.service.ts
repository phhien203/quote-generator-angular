import { QuoteService } from './quote.service';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Quote } from '../../components/quote/quote.interface';
import { QUOTES } from '../../data/quotes';

@Injectable()
export class LocalQuoteService implements QuoteService {
  loadingQuote$: Observable<boolean>;

  getQuote(): Observable<Quote> {
    return of(QUOTES[Math.floor(Math.random() * QUOTES.length)]);
  }
}

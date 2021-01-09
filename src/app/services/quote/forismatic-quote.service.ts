import { QuoteService } from './quote.service';
import { Inject, Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { INITIAL_QUOTE, Quote } from '../../components/quote/quote.interface';
import { HttpClient } from '@angular/common/http';
import { PROXY_URL } from '../../tokens/proxy-url.token';
import { QUOTE_API_URL } from '../../tokens/quote-url.token';
import { catchError, finalize, map } from 'rxjs/operators';

@Injectable()
export class ForismaticQuoteService implements QuoteService {
  private readonly loadingQuote$$ = new Subject<boolean>();

  constructor(
    @Inject(PROXY_URL)
    private readonly proxyUrl: string,
    @Inject(QUOTE_API_URL)
    private readonly quoteUrl: string,
    private readonly http: HttpClient
  ) {}

  loadingQuote$: Observable<boolean> = this.loadingQuote$$.asObservable();

  getQuote(): Observable<Quote> {
    this.loadingQuote$$.next(true);
    return this.http.get<Quote>(`${this.proxyUrl}${this.quoteUrl}`).pipe(
      map(
        (res: any) =>
          ({ text: res.quoteText, author: res.quoteAuthor } as Quote)
      ),
      finalize(() => {
        this.loadingQuote$$.next(false);
      }),
      catchError(() => of(INITIAL_QUOTE))
    );
  }
}

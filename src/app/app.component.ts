import { ChangeDetectionStrategy, Component, Inject, OnInit, } from '@angular/core';
import { INITIAL_QUOTE, Quote } from './components/quote/quote.interface';
import { Observable, Subject } from 'rxjs';
import { QuoteService } from './services/quote/quote.service';
import { startWith, switchMap } from 'rxjs/operators';
import { QUOTE_SERVICE } from './tokens/quote-service.token';
import { WINDOW } from './tokens/window.token';
import { ForismaticQuoteService } from './services/quote/forismatic-quote.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [
    {
      provide: QUOTE_SERVICE,
      useClass: ForismaticQuoteService,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  private readonly newQuote$$ = new Subject<void>();
  quote$: Observable<Quote>;

  constructor(
    @Inject(WINDOW) private readonly window: Window,
    @Inject(QUOTE_SERVICE) public readonly quoteService: QuoteService
  ) {}

  ngOnInit(): void {
    this.quote$ = this.newQuote$$.pipe(
      switchMap(() => this.quoteService.getQuote()),
      startWith(INITIAL_QUOTE),
    );
  }

  onTweetQuote(quote: Quote): void {
    const url = `https://twitter.com/intent/tweet?text=${quote.text} - ${quote.author}`;
    this.window.open(url, '_blank');
  }

  onNewQuote(): void {
    this.newQuote$$.next();
  }
}

import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { Quote } from './components/quote/quote.interface';
import { BehaviorSubject, Observable } from 'rxjs';
import { QuoteService } from './services/quote/quote.service';
import { switchMap } from 'rxjs/operators';
import { LocalQuoteService } from './services/quote/local-quote.service';
import { QUOTE_SERVICE } from './tokens/quote-service.token';
import { WINDOW } from './tokens/window.token';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [
    {
      provide: QUOTE_SERVICE,
      useClass: LocalQuoteService,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  private readonly newQuote$$ = new BehaviorSubject<void>(undefined);
  quote$: Observable<Quote>;

  constructor(
    @Inject(WINDOW) private readonly window: Window,
    @Inject(QUOTE_SERVICE) private readonly quoteService: QuoteService
  ) {}

  ngOnInit(): void {
    this.quote$ = this.newQuote$$.pipe(
      switchMap(() => this.quoteService.getQuote())
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

import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, } from '@angular/core';
import { Quote } from './quote.interface';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-quote',
  templateUrl: './quote.component.html',
  styleUrls: ['./quote.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuoteComponent {
  faTwitter = faTwitter;

  @Input() quote: Quote;
  @Input() loadingQuote: boolean;

  @Output() tweetQuote = new EventEmitter<Quote>();
  @Output() newQuote = new EventEmitter();
}

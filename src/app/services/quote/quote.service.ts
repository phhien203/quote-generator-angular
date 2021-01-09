import { Observable } from 'rxjs';
import { Quote } from '../../components/quote/quote.interface';

export interface QuoteService {
  loadingQuote: Observable<boolean>;
  getQuote(): Observable<Quote>;
}

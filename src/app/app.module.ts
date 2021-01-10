import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { QuoteComponent } from './components/quote/quote.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [AppComponent, QuoteComponent],
  imports: [BrowserModule.withServerTransition({ appId: 'serverApp' }), HttpClientModule , FontAwesomeModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { BoxComponent } from './components/box/box.component';
import { FetchService } from './services/fetch.service';
import { InViewDirective } from './directives/in-view.directive';

@NgModule({
  imports:      [ BrowserModule, FormsModule ],
  declarations: [ AppComponent, BoxComponent, InViewDirective ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }

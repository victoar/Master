import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {CinemaService} from "./services/cinema.service";
import {HttpClientModule} from "@angular/common/http";
import {DatePipe} from "@angular/common";
import {StatisticsService} from "./services/statistics.service";


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule
  ],
  providers: [
    CinemaService,
    StatisticsService,
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

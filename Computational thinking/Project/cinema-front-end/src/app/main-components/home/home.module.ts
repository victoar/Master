import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import {HomeComponent} from "./home.component";
import {SubComponentsModule} from "../../sub-components/sub-components.module";
import { StatisticsComponent } from './statistics/statistics.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { InfoComponent } from './info/info.component';
import {FormsModule} from "@angular/forms";
import { ReserveTicketComponent } from './reserve-ticket/reserve-ticket.component';


@NgModule({
  declarations: [
    HomeComponent,
    StatisticsComponent,
    ScheduleComponent,
    InfoComponent,
    ReserveTicketComponent
  ],
    imports: [
        CommonModule,
        HomeRoutingModule,
        SubComponentsModule,
        FormsModule
    ]
})
export class HomeModule { }

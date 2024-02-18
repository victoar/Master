import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./home.component";
import {StatisticsComponent} from "./statistics/statistics.component";
import {ScheduleComponent} from "./schedule/schedule.component";
import {InfoComponent} from "./info/info.component";
import {ReserveTicketComponent} from "./reserve-ticket/reserve-ticket.component";

const routes: Routes = [{
  path: '', component: HomeComponent,
  children: [
    { path: '', component: InfoComponent },
    { path: 'home', component: InfoComponent },
    { path: 'statistics', component: StatisticsComponent },
    { path: 'schedule', component: ScheduleComponent },
    { path: 'reserve-ticket', component: ReserveTicketComponent }
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }

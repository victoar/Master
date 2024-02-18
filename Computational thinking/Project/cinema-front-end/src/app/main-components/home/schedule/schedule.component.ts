import {Component, OnInit} from '@angular/core';
import {CinemaService} from "../../../services/cinema.service";
import {Schedule} from "../../../models/scheduleModel";
import {DatePipe} from "@angular/common";
import {Cinema} from "../../../models/cinemaModel";
import {Router} from "@angular/router";

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent implements OnInit {

  schedules: Schedule[] = [];
  cinemas: Cinema[] = [];

  selectedCinema: Cinema | null = null;
  filterGenre: string = "";

  constructor(private cinemaService: CinemaService,
              private router: Router,
              private datePipe: DatePipe) {
  }

  ngOnInit() {
    this.cinemaService.getSchedules().subscribe(data => {
      this.schedules = data;
      this.cinemaService.getCinemas().subscribe(data => {
        this.cinemas = data;
      })
    })
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return this.datePipe.transform(date, 'dd MMM');
  }

  goToReserveTicket(schedule: Schedule) {
    this.router.navigate(["reserve-ticket"], {queryParams: {scheduleid: schedule.id}});
  }

  onCinemaChange() {
    if(this.selectedCinema != null) {
      if(this.filterGenre != "") {
        this.cinemaService.getSchedulesByCinemaIdAndGenre(this.selectedCinema.cinemaid, this.filterGenre).subscribe(data => {
          this.schedules = data;
        })
      } else {
        this.cinemaService.getSchedulesByCinemaId(this.selectedCinema.cinemaid).subscribe(data => {
          this.schedules = data;
        })
      }
    } else {
      if(this.filterGenre != "") {
        this.cinemaService.getSchedulesByGenre(this.filterGenre).subscribe(data => {
          this.schedules = data;
        })
      } else {
        this.cinemaService.getSchedules().subscribe(data => {
          this.schedules = data;
        })
      }
    }

  }

  onGenreFilterInput() {
    if(this.filterGenre != "") {
      if(this.selectedCinema != null) {
        this.cinemaService.getSchedulesByCinemaIdAndGenre(this.selectedCinema.cinemaid, this.filterGenre).subscribe(data => {
          this.schedules = data;
        })
      } else {
        this.cinemaService.getSchedulesByGenre(this.filterGenre).subscribe(data => {
          this.schedules = data;
        })
      }
    } else {
      if(this.selectedCinema != null) {
        this.cinemaService.getSchedulesByCinemaId(this.selectedCinema.cinemaid).subscribe(data => {
          this.schedules = data;
        })
      } else {
        this.cinemaService.getSchedules().subscribe(data => {
          this.schedules = data;
        })
      }
    }
  }
}

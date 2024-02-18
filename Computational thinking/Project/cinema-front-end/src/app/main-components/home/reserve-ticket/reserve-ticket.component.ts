import {Component, OnInit} from '@angular/core';
import {Schedule} from "../../../models/scheduleModel";
import {ActivatedRoute, Router} from "@angular/router";
import {CinemaService} from "../../../services/cinema.service";
import {DatePipe} from "@angular/common";
import {Ticket} from "../../../models/ticketModel";

@Component({
  selector: 'app-reserve-ticket',
  templateUrl: './reserve-ticket.component.html',
  styleUrls: ['./reserve-ticket.component.scss']
})
export class ReserveTicketComponent implements OnInit {

  schedule: Schedule;
  rows: number[] = [];
  columns: number[] = [];
  selectedRow: number = 0;
  selectedColumn: number = 0;

  nameInput: string = "";
  emailInput: string = "";
  phoneNumberInput: string = "";

  tickets: Ticket[] = [];
  clientid: string = "";

  showFirstStep: boolean = true;
  showSecondStep: boolean = false;
  showSuccessMessage: boolean = false;

  constructor(private route: ActivatedRoute,
              private datePipe: DatePipe,
              private cinemaService: CinemaService) {
  }

  ngOnInit() {
    this.route.queryParams.subscribe(data => {
      this.cinemaService.getScheduleById(data.scheduleid).subscribe(res => {
        this.schedule = res[0];
        for (let i = 0; i < this.schedule.cinema.rows; i++) {
          this.rows.push(i);
        }

        for (let i = 0; i < this.schedule.cinema.columns; i++) {
          this.columns.push(i);
        }
      })
    })
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return this.datePipe.transform(date, 'dd MMM');
  }

  onProceedClick() {
    if(this.nameInput != "" && this.emailInput != "" && this.phoneNumberInput != "") {
      this.cinemaService.addClient(this.nameInput, this.emailInput, this.phoneNumberInput).subscribe(res => {
        this.clientid = res.clientid;
        this.cinemaService.getTicketsByMovieId(this.schedule.movie.movieid).subscribe(res => {
          this.tickets = res;
          this.showFirstStep = false;
          this.showSecondStep = true;
        })
      })
    }
  }

  isSeatOccupied(rowIndex: number, seatIndex: number) {
    if(this.tickets != null) {
      for (let ticket of this.tickets) {
        if(ticket.row == (rowIndex + 1) && ticket.seat_nr == (seatIndex + 1)) {
          return true;
        }
      }
    }
    return false;
  }

  setTicketSeat(rowIndex: number, seatIndex: number) {
    this.selectedRow = rowIndex + 1;
    this.selectedColumn = seatIndex + 1;
  }

  onReserveClick() {
    this.cinemaService.addTicket(this.schedule.cinema.cinemaid, this.schedule.movie.movieid, this.clientid, this.selectedRow, this.selectedColumn).subscribe(res => {
      this.showSuccessMessage = true;
    })
  }
}

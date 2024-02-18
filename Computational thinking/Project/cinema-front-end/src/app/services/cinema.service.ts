import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Schedule} from "../models/scheduleModel";
import {Cinema} from "../models/cinemaModel";
import {Ticket} from "../models/ticketModel";

@Injectable({
  providedIn: 'root'
})
export class CinemaService {

  GENERAL_PATH: string = "http://127.0.0.1:5000";

  constructor(private http: HttpClient) {

  }

  getSchedules(): Observable<Schedule[]> {
    const endpoint = '/schedule'; // Replace with your endpoint URL
    return this.http.get<Schedule[]>(this.GENERAL_PATH + endpoint);
  }

  getScheduleById(scheduleid): Observable<Schedule[]> {
    const endpoint = `/schedule/id/${scheduleid}`; // Replace with your endpoint URL
    return this.http.get<Schedule[]>(this.GENERAL_PATH + endpoint);
  }

  getCinemas(): Observable<Cinema[]> {
    const endpoint = '/cinemas';
    return this.http.get<Cinema[]>(this.GENERAL_PATH + endpoint);
  }

  getSchedulesByCinemaId(cinemaId): Observable<Schedule[]> {
    const endpoint = `/schedule/${cinemaId}`; // Replace with your endpoint URL
    return this.http.get<Schedule[]>(this.GENERAL_PATH + endpoint);
  }

  getSchedulesByGenre(genre): Observable<Schedule[]> {
    const endpoint = `/schedule/genre/${genre}`; // Replace with your endpoint URL
    return this.http.get<Schedule[]>(this.GENERAL_PATH + endpoint);
  }

  getSchedulesByCinemaIdAndGenre(cinemaId, genre): Observable<Schedule[]> {
    const endpoint = `/schedule/genre/${genre}/${cinemaId}`; // Replace with your endpoint URL
    return this.http.get<Schedule[]>(this.GENERAL_PATH + endpoint);
  }

  addClient(name, email, phoneNumber): Observable<any> {
    const endpoint = `/client`; // Replace with your endpoint URL
    const data = { "name": name, "email": email, "phone": phoneNumber };
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(this.GENERAL_PATH + endpoint, data, { headers });
  }

  getTicketsByMovieId(movieid): Observable<Ticket[]> {
    const endpoint = `/tickets/${movieid}`; // Replace with your endpoint URL
    return this.http.get<Ticket[]>(this.GENERAL_PATH + endpoint);
  }

  addTicket(cinemaid, movieid, clientid, row, column): Observable<any> {
    const endpoint = `/ticket`; // Replace with your endpoint URL
    const data = { "cinemaid": cinemaid, "movieid": movieid, "clientid": clientid, "row": row, "column": column };
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(this.GENERAL_PATH + endpoint, data, { headers });
  }

}

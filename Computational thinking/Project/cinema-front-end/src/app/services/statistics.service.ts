import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Schedule} from "../models/scheduleModel";
import {Movie} from "../models/movieModel";
import {Cinema} from "../models/cinemaModel";

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {

  GENERAL_PATH: string = "http://127.0.0.1:5000";

  constructor(private http: HttpClient) { }

  getStatistcsMWM(): Observable<Movie[]> {
    const endpoint = '/most_wanted_movie'; // Replace with your endpoint URL
    return this.http.get<Movie[]>(this.GENERAL_PATH + endpoint);
  }

  getStatistcsMWC(): Observable<Cinema[]> {
    const endpoint = '/most_wanted_cinema'; // Replace with your endpoint URL
    return this.http.get<Cinema[]>(this.GENERAL_PATH + endpoint);
  }

  getDescriptiveStatistcs(table_name): Observable<any> {
    const endpoint = `/get_statistics/${table_name}`; // Replace with your endpoint URL
    return this.http.get<any>(this.GENERAL_PATH + endpoint);
  }
}

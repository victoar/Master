import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiControllerService {

  constructor(private http: HttpClient) { }

  private apiUrl = 'http://localhost:5000/api/';

  getDatabaseData(): Observable<any> {
    return this.http.get<any>(this.apiUrl + 'shape');
  }

  getColumnData(): Observable<ColumnInfo[]> {
    return this.http.get<ColumnInfo[]>(this.apiUrl + 'columns');
  }

  getFirstRows(nrRows: number): Observable<any> {
    return this.http.get<any>(this.apiUrl + 'first/' + nrRows);
  }

  getLastRows(nrRows: number): Observable<any> {
    return this.http.get<any>(this.apiUrl + 'last/' + nrRows);
  }

  getDescriptions(): Observable<any> {
    return this.http.get<any>(this.apiUrl + 'describe');
  }

  makePrediction(engineSize: string, cylinders: string, fuelConsumption: string): Observable<any> {
    return this.http.get<any>(this.apiUrl + 'predict/' + engineSize + '/' + cylinders + '/' + fuelConsumption);
  }
}

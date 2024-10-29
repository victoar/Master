import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiControllerService {

  constructor(private http: HttpClient) { }

  private apiUrl = 'http://localhost:5000/api/';

  uploadDataset(file): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<any>(this.apiUrl + 'upload', formData);
  }

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

  cleanDatasetUsingGet(): Observable<any> {
    return this.http.get<any>(this.apiUrl + 'cleaning');
  }

  trainModel(features, target, modelType) {
    return this.http.post<any>(this.apiUrl + 'train', {features: features, target: target, model_type: modelType});
  }

  makePrediction(features: string[], modelType): Observable<any> {
    return this.http.post<any>(this.apiUrl + 'predict', {features: features, model_type: modelType});
  }

  transformUsingGet(): Observable<any> {
    return this.http.get<any>(this.apiUrl + 'transform');
  }
}

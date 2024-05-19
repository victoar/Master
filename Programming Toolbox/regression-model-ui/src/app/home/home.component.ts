import { Component, OnInit } from '@angular/core';
import {animate, AUTO_STYLE, state, style, transition, trigger} from '@angular/animations';
import {ApiControllerService} from '../services/api-controller.service';

const DEFAULT_DURATION = 500;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [
    trigger('collapse', [
      state('false', style({ height: AUTO_STYLE, visibility: AUTO_STYLE })),
      state('true', style({ height: '0', visibility: 'hidden' })),
      transition('false => true', animate(DEFAULT_DURATION + 'ms ease-in')),
      transition('true => false', animate(DEFAULT_DURATION + 'ms ease-out'))
    ])
  ]
})
export class HomeComponent implements OnInit {

  isProjectDescriptionOpen: boolean = false;
  isDatabaseDescriptionOpen: boolean = false;
  isFirstColumnsOpen: boolean = false;
  isLastColumnsOpen: boolean = false;
  isValuesDescriptionOpen: boolean = false;
  isPredictionOpen: boolean = false;

  dbRows;
  dbCols;
  public columnInfoList: ColumnInfo[] = [];
  public rowsNumberForTop: number;
  public rowsNumberForTail: number;
  public firstRowsList: any[] = [];
  public lastRowsList: any[] = [];
  public descriptionsList: any[] = [];
  public engineSize: number;
  public cylinders: number;
  public fuelConsumption: number;
  public predictionResult: string = '';

  constructor(private apiController: ApiControllerService) { }

  ngOnInit() {
    this.apiController.getDatabaseData().subscribe(res => {
      this.dbCols = res.columns;
      this.dbRows = res.rows;
    });
  }


  loadDatasetDescription() {
    this.apiController.getColumnData().subscribe(res => {
      this.columnInfoList = res;
    });
  }

  loadFirstRows() {
    if(this.rowsNumberForTop == undefined) {
      alert('Please input a valid number of rows');
      return;
    }

    if(this.rowsNumberForTop > this.dbRows || this.rowsNumberForTop < 1) {
      alert('Please input a number between 1 and ' + this.dbRows);
      return;
    }

    this.apiController.getFirstRows(this.rowsNumberForTop).subscribe(res => {
      this.firstRowsList = res;
    });
  }

  loadLastRows() {
    if(this.rowsNumberForTail == undefined) {
      alert('Please input a valid number of rows');
      return;
    }

    if(this.rowsNumberForTail > this.dbRows || this.rowsNumberForTail < 1) {
      alert('Please input a number between 1 and ' + this.dbRows);
      return;
    }

    this.apiController.getLastRows(this.rowsNumberForTail).subscribe(res => {
      this.lastRowsList = res;
    });
  }

  loadDescription() {
    this.apiController.getDescriptions().subscribe(res => {
      this.descriptionsList = res;
      console.log(res);
    });
  }

   makePrediction() {
    if(this.engineSize == undefined) {
      alert('Please input a valid engine size value');
      return;
    }

    if(this.cylinders == undefined) {
      alert('Please input a valid cylinders value');
      return;
    }

    if(this.fuelConsumption == undefined) {
      alert('Please input a valid fuel consumption value');
      return;
    }

    this.apiController.makePrediction(this.engineSize.toString(), this.cylinders.toString(), this.fuelConsumption.toString()).subscribe(res => {
      console.log(res);
      this.predictionResult = res;
    });
   }
}

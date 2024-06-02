import { Component, OnInit } from '@angular/core';
import {animate, AUTO_STYLE, state, style, transition, trigger} from '@angular/animations';
import {ApiControllerService} from '../services/api-controller.service';
import {$e} from 'codelyzer/angular/styles/chars';

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
  isDatasetCleaningOpen: boolean = false;
  isTransformOpen: boolean = false;
  isPreprocessingOpen: boolean = false;
  isPredictionOpen: boolean = false;

  dbRows;
  dbCols;
  newDbRows;
  newDbCols;
  public trainModelResponse: string = '';
  public headers: string[] = [];
  public descriptionHeaders: string[] = [];
  public selectedFeatures: { [key: string]: boolean } = {};
  public selectedFeaturesList: string[] = [];
  public inputFeatures: { [key: string]: any } = {};
  public selectedTarget: string | null = null;
  public selectedAlgorithm: string = 'regression';
  public selectedAlgorithmForPredicting: string = 'regression';
  public columnInfoList: ColumnInfo[] = [];
  public rowsNumberForTop: number;
  public rowsNumberForTail: number;
  public firstRowsList: any[] = [];
  public lastRowsList: any[] = [];
  public descriptionsList: any[] = [];
  public predictionResult: string = '';
  public clustersNumber;
  file: File | null = null;

  constructor(private apiController: ApiControllerService) { }

  ngOnInit() {
    // this.apiController.getDatabaseData().subscribe(res => {
    //   this.dbCols = res.columns;
    //   this.dbRows = res.rows;
    // });
  }

  onFileChange($event: Event) {
    this.file = $event.target['files'][0];
  }

  uploadFile() {
    this.apiController.uploadDataset(this.file).subscribe(res => {
      this.dbCols = res.columns;
      this.dbRows = res.rows;
      this.headers = res.headers;
      this.resetValues();
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
      console.log(res);
      this.firstRowsList = res.data;
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
      this.lastRowsList = res.data;
    });
  }

  loadDescription() {
    this.apiController.getDescriptions().subscribe(res => {
      this.descriptionHeaders = res.headers;
      this.descriptionsList = res.data;
    });
  }

  cleanDataset() {
    this.apiController.cleanDatasetUsingGet().subscribe(res => {
      this.newDbRows = res.rows;
      this.newDbCols = res.columns;
    });
  }

  train() {

    if(this.selectedAlgorithm == undefined) {
      alert('Please select an algortithm type');
      return;
    }

    this.selectedFeaturesList = [];
    for (const key in this.selectedFeatures) {
      if(this.selectedFeatures[key]) {
        this.selectedFeaturesList.push(key);
      }
    }

    if(this.selectedFeaturesList == undefined) {
      alert('Please select at least one feature');
      return;
    }

    if(this.selectedAlgorithm == 'clustering') {
      if(this.clustersNumber < 1) {
        alert('Please input a valid number of clusters');
        return;
      }
      this.apiController.trainModel(this.selectedFeaturesList, this.clustersNumber, this.selectedAlgorithm).subscribe(res => {
        this.trainModelResponse = res.message;
      });
    } else {
      if(this.selectedTarget == undefined) {
        alert('Please select target variable');
        return;
      }
      this.apiController.trainModel(this.selectedFeaturesList, this.selectedTarget, this.selectedAlgorithm).subscribe(res => {
        this.trainModelResponse = res.message;
      });
    }
  }

   makePrediction() {
     let features: string[] = [];
     for (const key in this.inputFeatures) {
       if(this.inputFeatures[key]) {
         features.push(this.inputFeatures[key]);
       } else {
         alert('Please do not leave empty inputs');
         return;
       }
     }

     if(this.selectedAlgorithmForPredicting == undefined) {
       alert('Please select an algortithm type');
       return;
     }

    this.apiController.makePrediction(features, this.selectedAlgorithmForPredicting).subscribe(res => {
      this.predictionResult = res.predicted_value;
    });
   }

   resetValues() {
     this.isDatabaseDescriptionOpen = false;
     this.isFirstColumnsOpen = false;
     this.isLastColumnsOpen = false;
     this.isValuesDescriptionOpen = false;
     this.isDatasetCleaningOpen = false;
     this.isTransformOpen = false;
     this.isPreprocessingOpen = false;
     this.isPredictionOpen = false;
     this.firstRowsList = [];
     this.lastRowsList = [];
     this.descriptionsList = [];
     this.predictionResult = '';
     this.newDbRows = undefined;
     this.newDbCols = undefined;
     this.trainModelResponse = '';
     this.descriptionHeaders = [];
     this.selectedFeatures = {};
     this.selectedFeaturesList = [];
     this.inputFeatures = {};
     this.selectedTarget = null;
     this.selectedAlgorithm = 'regression';
     this.selectedAlgorithmForPredicting = 'regression';
     this.columnInfoList = [];
   }

  transform() {
    this.apiController.transformUsingGet().subscribe(res => {
      console.log(res);
    });
  }
}

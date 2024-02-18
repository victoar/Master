import {Component, OnInit} from '@angular/core';
import {StatisticsService} from "../../../services/statistics.service";
import {Movie} from "../../../models/movieModel";
import {Cinema} from "../../../models/cinemaModel";

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit {

  mostWatchedMovie: Movie;
  mostVisitedCinema: Cinema;
  statisticsData: any;

  constructor(private statisticsService: StatisticsService) {
  }

  ngOnInit() {
    this.getStatisticsMWM();
    this.getStatisticsMWC();
    this.getDescriptiveStatistics();
  }

  getStatisticsMWM() {
    this.statisticsService.getStatistcsMWM().subscribe(res => {
      console.log(res);
      this.mostWatchedMovie = res[0];
    })
  }

  getStatisticsMWC() {
    this.statisticsService.getStatistcsMWC().subscribe(res => {
      console.log(res);
      this.mostVisitedCinema = res[0];
    })
  }

  getDescriptiveStatistics() {
    this.statisticsService.getDescriptiveStatistcs("tickets").subscribe(res => {
      console.log(res);
      this.statisticsData = res;
        console.log(this.statisticsData["25%"]);
    })
  }

}

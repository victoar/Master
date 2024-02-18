import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'home-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  currentYear: number;

  ngOnInit() {
    this.currentYear = new Date().getFullYear();
  }

}

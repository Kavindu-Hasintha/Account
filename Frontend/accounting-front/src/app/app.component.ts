import { Component, OnInit } from '@angular/core';
import { AppServiceService } from './app-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'accounting-front';

  constructor(private serivce : AppServiceService) {

  }

  ngOnInit() {
    this.getDataFromAPI();
  }

  getDataFromAPI() {
    this.serivce.getData().subscribe((response) => {
      console.log('Response from api is ', response);
    }, (error) => {
      console.log('Error is ', error);
    });
  }

}


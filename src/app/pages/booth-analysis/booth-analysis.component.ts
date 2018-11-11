import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-booth-analysis',
  templateUrl: './booth-analysis.component.html',
  styleUrls: ['./booth-analysis.component.scss']
})
export class BoothAnalysisComponent implements OnInit {

  public levelView : any[]=[700,300];
  public genderView: any[] = [400, 200];

  constructor() { }

  ngOnInit() {
    this.gender =[{
      name: "Male",
      value: 30
    },{
      name: "Female",
      value: 70
    }];

    this.position = [
      {name: "Year 1", value: 39.21568627450981},
      {name: "Year 2", value: 45.09803921568628},
      {name: "Year 3", value: 15.686274509803921}
    ];

    this.averageDurationPerBooth = [
      {
        name: "Booth 1",
        series: [
          {
            name: "Year 1",
            value: 12
          },{
            name: "Year 2",
            value: 13
          }
        ]
      },{
        name: "Booth 2",
        series:[
          {
            name: "Year 1",
            value: 46,
          },{
            name: "Year 2",
            value: 74
          }
        ]
      }
    ];

    this.totalVisitors = [{
      name: "Total Visitors",
      value: 100
    }];

    this.averageDuration = [{
      name: "Average Duration",
      value: 30
    }]


  }

}

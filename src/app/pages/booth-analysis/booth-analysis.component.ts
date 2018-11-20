import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { DaoService } from '../../services/dao.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-booth-analysis',
  templateUrl: './booth-analysis.component.html',
  styleUrls: ['./booth-analysis.component.scss']
})
export class BoothAnalysisComponent implements OnInit {

  //event details
  public eventId: number;
  public accountId: number;
  // toolbar
  public eventStatus : any;
  // demo analysis
  public levelView : any[]=[700,300];
  public genderView: any[] = [350, 200];
  public position: any[];
  public gender: any[] = [];
  public chartData : boolean = false;
  public genderTrueView: any[]=[400,200];


  //report analysis
  public averageDurationPerBooth :any[] =[];
  public totalVisitorsPerBooth: any[] =[];
  public totalVisitors: any[] = [];
  public averageDuration : any[] = [];
  public scheduleAna : any[] = [];
  public summaryData: boolean = false;
  public averageDurationData: boolean = false;
  public totalVisitorsData : boolean =false;
  public scheduleData: boolean = false;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private apiService: ApiService,
              private daoService: DaoService) {
    this.route.params.subscribe((param)=>{
        this.eventId = param.id;
        console.log(this.eventId);
    });
    this.accountId = this.daoService.getAccount();
  }

  ngOnInit() {
    this.loadDemographics();
    this.loadSummary();
    this.loadAverageDuration();
    this.loadTotalVisitors();
    this.loadSchedule();
    this.getEventStatus();
    // this.gender =[{
    //   name: "Male",
    //   value: 30
    // },{
    //   name: "Female",
    //   value: 70
    // }];
    //
    // this.position = [
    //   {name: "Year 1", value: 39.21568627450981},
    //   {name: "Year 2", value: 45.09803921568628},
    //   {name: "Year 3", value: 15.686274509803921}
    // ];

    // this.averageDurationPerBooth = [
    //   {
    //     name: "Booth 1",
    //     series: [
    //       {
    //         name: "Year 1",
    //         value: 12
    //       },{
    //         name: "Year 2",
    //         value: 13
    //       }
    //     ]
    //   },{
    //     name: "Booth 2",
    //     series:[
    //       {
    //         name: "Year 1",
    //         value: 46,
    //       },{
    //         name: "Year 2",
    //         value: 74
    //       }
    //     ]
    //   }
    // ];

    // this.totalVisitors = [{
    //   name: "Total Visitors",
    //   value: 100
    // }];
    //
    // this.averageDuration = [{
    //   name: "Average Duration",
    //   value: 30
    // }]

  }

  public getEventStatus = function() {
    this.apiService.getSingleEvent(this.accountId, this.eventId, (data) => {
      console.log(data);
      this.eventStatus = data.status;
    }, (err) => {
      console.log(err);
    });
  };

  public loadDemographics = function(){
    this.apiService.getAnalysisDemogra(this.eventId, (data)=>{
      // console.log(data);
      this.processGenderData(Math.round(Number(data.gender)));
      this.position = data.level;
      this.chartData = true;
    });
  }

  public loadSummary = function(){
    this.apiService.getAnalysisSummary(this.eventId, (data)=>{
      // console.log(data);
      this.processDuration(data.avg_duration);
      this.processTotal(data.total_visitors);
      this.summaryData = true;

    })
  }

  public loadAverageDuration = function(){
    this.apiService.getAnalysisAverageDuration(this.eventId, (data)=>{
      console.log(data);
      this.averageDurationPerBooth = data;
      this.averageDurationData = true;

    })
  }

  public loadTotalVisitors = function(){
    this.apiService.getAnalysisTotalVisitors(this.eventId, (data)=>{
      console.log(data);
      this.totalVisitorsPerBooth = data;
      this.totalVisitorsData = true;
    })
  }

  public loadSchedule = function(){
    this.apiService.getAnalysisSchedule(this.eventId, (data)=>{
      console.log(data);
      this.scheduleAna = data;
      this.scheduleData = true;
    })
  }


  public processGenderData = function(malePer: number){
    let female = {
      name: "Female",
      value: 100-malePer
    };
    this.gender.push(female);
    let male = {
      name: "Male",
      value: malePer
    };
    this.gender.push(male);
  }

  public processDuration = function(d: number){
    let duration = {
      name: "Average Duration (min)",
      value: d
    }
    this.averageDuration.push(duration);
  }

  public processTotal = function(d: number){
    let total = {
      name: "Total Visitors",
      value: d
    }
    this.totalVisitors.push(total);
  }

  formatGender(value): string {
    return value.value.toString()+"%";
  }

  formatJobLevel(value):string{
    return value+"%";
  }

}

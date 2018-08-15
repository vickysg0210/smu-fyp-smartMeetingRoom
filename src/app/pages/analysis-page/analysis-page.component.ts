import { Component, OnInit} from '@angular/core';
import { ApiService } from '../../services/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-analysis-page',
  templateUrl: './analysis-page.component.html',
  styleUrls: ['./analysis-page.component.scss']
})
export class AnalysisPageComponent implements OnInit {
  public eventId : number;
  public chartData : boolean;
  public gender = [];
  public country=[];
  public industry=[];
  public level = [];
  public genderView: any[] = [400, 200];
  public countryView: any[]=[300,300];
  public industryView: any[]=[300,300];
  public levelView : any[]=[700,300];

  public attendances : Array<any>;


  constructor(private route: ActivatedRoute,
              private router: Router,
              private apiService : ApiService) {
    this.route.params.subscribe((param)=>{
        this.eventId = param.id;
        console.log(this.eventId);
    });
  }

  ngOnInit() {
    this.loadDemographics();
    // this.loadAttendances();
  }


  public loadDemographics = function(){
    this.apiService.getAnalysisDemogra(this.eventId,(data)=>{
      console.log(data);
      this.processGenderData(Math.round(Number(data.gender)));
      this.country = data.country;
      this.industry = data.industry;
      this.level = data.level;
      this.chartData = true;
      console.log(data.gender);

    }),(error)=>{
      console.log(error);
    }
  }
  public loadAttendances = function(){
    this.apiService.getAnalysisAtte(this.eventId,(data)=>{
      console.log(data);
      this.attendances = data;
    }),(error)=>{
      console.log(error);
    }
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

  formatGender(value): string {
    return value.value.toString()+"%";
  }


}

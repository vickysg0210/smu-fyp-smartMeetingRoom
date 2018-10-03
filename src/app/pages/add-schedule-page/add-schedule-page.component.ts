import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { DaoService } from '../../services/dao.service';


@Component({
  selector: 'app-add-schedule-page',
  templateUrl: './add-schedule-page.component.html',
  styleUrls: ['./add-schedule-page.component.scss']
})
export class AddSchedulePageComponent implements OnInit {

    public pageName: string;
    public startTime: string;
    public endTime: string;
    public schedule: {
      startDate: string,
      startTime: string,
      endDate: string,
      endTime: string,
      description: string
    };
    public eventId: number;
    public accountId: number;
    public eventStatus: any;


    constructor(public router: Router,
                private route: ActivatedRoute,
                private apiService: ApiService,
                private daoService: DaoService
      ) {
      this.pageName = 'add-event-page';
      this.route.params.subscribe((param)=>{
          this.eventId = +param.id;
      });
      this.accountId = this.daoService.getAccount();
    }

    ngOnInit() {
      console.log(this.eventId);
      this.schedule = {
        startDate: '',
        startTime: '',
        endDate: '',
        endTime: '',
        description: ''
      };
      this.getEventStatus();
    }

    public addNewActivity = function(){
      this.startTime = this.schedule.startDate.getMonth() + 1 + '/'
                    + this.schedule.startDate.getDate() + '/'
                    + this.schedule.startDate.getFullYear() + ' '
                    + this.schedule.startTime+":00";
      this.endTime = this.schedule.startDate.getMonth() + 1 + '/'
                    + this.schedule.startDate.getDate() + '/'
                    + this.schedule.startDate.getFullYear() + ' '
                    + this.schedule.endTime+":00";
      console.log('starttime='+ this.startTime);
      console.log('endtime='+ this.endTime);
      this.apiService.createSchedule(this.eventId, this.startTime, this.endTime, this.schedule.description, (data)=>{
        console.log(data);
        this.backToHome();
      }, (err)=>{
        console.log(err);
        //this.showErrorMessage();
      });
    }


    public backToHome = function(){
      this.router.navigate(['/', this.eventId, 'schedule']);
    }

    public parseDate = function(ddate){
      return ddate.getMonth() + 1 + '/'
            +ddate.getDate() + '/'
            +ddate.getFullYear() + ' ';
    }

    public getEventStatus = function() {
      this.apiService.getSingleEvent(this.accountId, this.eventId, (data) => {
        console.log(data);
        this.eventStatus = data.status;
        console.log("Get status successful: current=" + this.eventStatus);
      }, (err) => {
        console.log(err);
      });
    };
}

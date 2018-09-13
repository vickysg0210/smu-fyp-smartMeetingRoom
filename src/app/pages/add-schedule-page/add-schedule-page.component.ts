import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../services/api.service';

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

    constructor(public router: Router,
                private route: ActivatedRoute,
                private apiService: ApiService,
      ) {
      this.pageName = 'add-event-page';
      this.route.params.subscribe((param)=>{
          this.eventId = +param.id;
      });
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
    }

    public addNewActivity = function(){
      this.startTime = this.schedule.startDate.getMonth() + 1 + '/'
                    + this.schedule.startDate.getDate() + '/'
                    + this.schedule.startDate.getFullYear() + ' '
                    + this.schedule.startTime+":00";
      this.endTime = this.schedule.endDate.getMonth() + 1 + '/'
                    + this.schedule.endDate.getDate() + '/'
                    + this.schedule.endDate.getFullYear() + ' '
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
      this.router.navigate(['/', this.eventId, 'home']);
    }

    public parseDate = function(ddate){
      return ddate.getMonth() + 1 + '/'
            +ddate.getDate() + '/'
            +ddate.getFullYear() + ' ';
    }

}

import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { DaoService } from '../../services/dao.service';

@Component({
  selector: 'app-schedule-page',
  templateUrl: './schedule-page.component.html',
  styleUrls: ['./schedule-page.component.scss']
})
export class SchedulePageComponent implements OnInit {

    public pageName: String = 'home';
    public eventId: number;
    public dataSource: Array<any>;
    public accountId: number;
    public schedule: {
      startTime: string,
      endTime: string,
      description: string
    };
    public displayedColumns = ['Date', 'StartTime', 'EndTime', 'Description', 'Actions'];
    public eventStatus: any;
    constructor(private route: ActivatedRoute,
                private apiService: ApiService,
                private daoService: DaoService) {
        this.route.params.subscribe((param)=>{
            this.eventId = +param.id;
        });
        this.accountId = this.daoService.getAccount();
    }

    ngOnInit() {
      this.getEventStatus();
      this.loadSchedules(this.eventId);
      this.schedule = {
        startTime: '',
        endTime: '',
        description: ''
      };
    }


    public loadSchedules = function(eventId: number){
      this.apiService.getSchedules(eventId,(data)=>{
        console.log(data);
        this.dataSource = data;
        for(let single of this.dataSource){
          single.date = single.startTime.substring(0, 10);
          //let startTimeString = single.startTime.substring(11, 21);
          let startHour = single.startTime.substring(11, 13);
          let startMinute = single.startTime.substring(14, 16);
          single.startTime = startHour + ':' + startMinute;
          let endHour = single.endTime.substring(11, 13);
          let endMinute = single.endTime.substring(14, 16);
          single.endTime = endHour + ':' + endMinute;
        }
      }, (err)=>{
        console.log(err);
      })
    }

    public addNewActivity = function(){
      console.log(this.schedule.startTime);
      console.log(this.schedule.endTime);
      this.apiService.createSchedule(this.eventId, this.schedule.startTime,this.schedule.endTime, this.schedule.description, (data)=>{
        this.ngOnInit();
      }, (err)=>{
        console.log(err);
      });
    }

    public deleteSchedule = function(scheduleId: number){
      console.log(scheduleId);
      this.apiService.deleteSchedule(scheduleId, (data)=>{
        this.ngOnInit();
      },(err)=>{
        console.log(err);
      })
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

import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-schedule-page',
  templateUrl: './schedule-page.component.html',
  styleUrls: ['./schedule-page.component.scss']
})
export class SchedulePageComponent implements OnInit {

    public pageName: String = 'home';
    public eventId: number;
    public dataSource: Array<any>;
    public schedule: {
      startTime: string,
      endTime: string,
      description: string
    };
    public displayedColumns = ['Date', 'StartTime', 'EndTime', 'Description', 'Actions'];

    constructor(private route: ActivatedRoute,
                private apiService: ApiService) {
        this.route.params.subscribe((param)=>{
            this.eventId = +param.id;
        });

    }

    ngOnInit() {
      this.loadSchedules(this.eventId);
      this.schedule = {
        startTime: '',
        endTime: '',
        description: ''
      };
    }

    public showSubContent = function(item: string){

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
        // this.showErrorMessage()
      })
    }

    public addNewActivity = function(){
      console.log(this.schedule.startTime);
      console.log(this.schedule.endTime);
      this.apiService.createSchedule(this.eventId, this.schedule.startTime,this.schedule.endTime, this.schedule.description, (data)=>{
        this.ngOnInit();
      }, (err)=>{
        console.log(err);
        //this.showErrorMessage();
      });
    }

    public deleteSchedule = function(scheduleId: number){
      console.log(scheduleId);
      this.apiService.deleteSchedule(scheduleId, (data)=>{
        this.ngOnInit();
      },(err)=>{
        console.log(err);
        //this.showErrorMessage();
      })
    }

    public showSuccessMessage = function(text : string){
      this.toastr.success(text, 'Successfully Added!',{
        timeOut: 4000,
        progressBar: true,
        positionClass: 'toast-bottom-center'
      })
    }

    public showErrorMessage = function(){
      this.toastr.warning('There is something wrong.', 'Oops!',{
        timeOut: 3000,
        progressBar: true,
        positionClass: 'toast-bottom-center'
      });
    }

}

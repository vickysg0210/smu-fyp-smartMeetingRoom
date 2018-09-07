import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../services/api.service';
//import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {


  public pageName: String = 'home';
  public eventId: number;
  public dataSource: Array<any>;
  public schedule: {
    startTime: string,
    endTime: string,
    description: string
  };
  public displayedColumns = ['StartTime', 'EndTime', 'Description', 'Actions'];

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
    }, (err)=>{
      console.log(err);
      // this.showErrorMessage()
    })
  }

  public addNewActivity = function(){
    this.apiService.createSchedule(this.eventId, this.schedule.startTime,this.schedule.endTime, this.schedule.description, (data)=>{
      this.ngOnInit();
    }, (err)=>{
      console.log(err);
      //this.showErrorMessage();
    })
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

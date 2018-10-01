import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { ToastrService } from 'ngx-toastr';
import { Tracking } from'../../interfaces/tracking';
import * as moment from 'moment';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {
  public map: any;
  public mapId : number;
  public participants: Array<any>;
  public absentParticipants: Array<any>
  private eventId: number;
  public presentList: Array<any>;
  public absentList: Array<any>;
  public windowWidth: number;
  public windowHeight: number;
  public tables: Array<{
    date: string,
    shape: string,
    tableId: number,
    radius: number,
    tableY: number,
    tableX: number,
    mac: string
  }>;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private apiService : ApiService,
              private toastr: ToastrService) {
    this.route.params.subscribe((param) => {
        this.eventId = param.id;
    });
    console.log(window.innerWidth);
    console.log(window.innerHeight);
    this.windowWidth = window.innerWidth/5*4;
    this.windowHeight = window.innerHeight/4*3;
    // this.absentParticipants = null;
    // this.participants=null;
  }

  ngOnInit() {
    this.getContainerMatrix();
    this.loadMap();
    this.loadParticipants();
    // setInterval(()=> {
    //    this.loadParticipants();
    //    console.log(this.participants);
    //  },8000);
    // this.loadParticipants();
  };

  public loadMap = function(){
    this.apiService.getMapByEventId(this.eventId,(data)=>{
      // console.log(data);
      this.mapId = data.mapId;
      this.map = data;
      this.mapName = data.mapName;
      // console.log(this.map);
      this.loadTable();
    },(err)=>{
      this.showErrorMessage("failed to load map")
      }
    );
  }

  public loadTable = function(){
    this.apiService.getTablesByMapId(this.mapId,(data)=>{
      this.tables = data;
      // console.log(this.tables)
    },(err)=>{
      this.showErrorMessage("error");
    });
  }

  public loadParticipants = function(){
    var now  = new Date();
    var day = moment(now).format("YYYY-MM-DD");
    var time = moment(now).subtract(5,'seconds').format("HH:mm:ss");
    // var nowApiString = day+"T"+time+"+08:00";
    // console.log("now"+nowApiString);
    var nowApiString = "2018-07-08T08:00:00";
    var momentTime  = moment(nowApiString);
    // console.log(timomentTimeme);
    this.apiService.getHistoryTrackings(nowApiString,(data)=>{
      this.participants = data.present;
      this.absentParticipants = data.absent;
      console.log(data.present);
      console.log(data.absent);
      console.log(this.participants);
    },(err)=>{
      console.log("failed to load participants");
    });

    setInterval(()=> {
      momentTime = momentTime.add('seconds',8)
      nowApiString = momentTime.format("YYYY-MM-DDTHH:mm:ss");
      console.log(nowApiString);
      this.apiService.getHistoryTrackings(nowApiString,(data)=>{
        this.participants = data.present;
        this.absentParticipants = data.absent;
        console.log(data.present);
        console.log(data.absent);
        console.log(this.participants);
      },(err)=>{
        console.log("failed to load participants");
      });
     },8000);


    // this.participants=[{
    //   name: "p1",
    //   url:"https://s3-ap-southeast-1.amazonaws.com/com.viatick/bms/medias/1530794905583michele.jpg",
    //   x: 1.45,
    //   y: 5.73
    // },{
    //     name: "p2",
    //     url:"https://s3-ap-southeast-1.amazonaws.com/com.viatick/bms/medias/1530794905583michele.jpg",
    //     x: 5.73,
    //     y: 1.45
    //   }
    // ];
    // this.absentParticipants = [{
    //   name: "p3",
    //   url:"https://s3-ap-southeast-1.amazonaws.com/com.viatick/bms/medias/1530794905583michele.jpg",
    //   x: 0,
    //   y: 0
    // }]

  }

  public getContainerMatrix = function(){
    this.windowWidth = window.innerWidth;
    this.windowHeight = window.innerHeight;
  }
  public showSuccessMessage = function(text : string){
    this.toastr.success(text, 'Success!',{
      timeOut: 4000,
      progressBar: true,
      positionClass: 'toast-bottom-center'
    });
  }
  public showErrorMessage = function(text: string){
    this.toastr.warning(text, 'Oops!',{
      timeOut: 3000,
      progressBar: true,
      positionClass: 'toast-bottom-center'
    });
  }



}

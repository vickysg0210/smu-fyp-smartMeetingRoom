import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { ToastrService } from 'ngx-toastr';
import { Tracking } from'../../interfaces/tracking';
import * as moment from 'moment';
import { HostListener } from '@angular/core';

@Component({
  selector: 'app-booth-live-page',
  templateUrl: './booth-live-page.component.html',
  styleUrls: ['./booth-live-page.component.scss']
})
export class BoothLivePageComponent implements OnInit {

  public eventId: number;
  public mapId : number;
  public participants: Array<any>;
  public windowWidth: number;
  public windowHeight: number;
  public map: any;


  constructor(private route: ActivatedRoute,
              private router: Router,
              private apiService : ApiService,
              private toastr: ToastrService) {
    this.route.params.subscribe((param) => {
        this.eventId = param.id;
    });
    this.windowWidth = window.innerWidth;
    this.windowHeight = window.innerHeight;
  }

  @HostListener('window:resize', ['$event']) onResize(event) {
      this.windowWidth = window.innerWidth;
      this.windowHeight = window.innerHeight;
      console.log(this.windowWidth);
      console.log(this.windowHeight);
    }

  ngOnInit() {
    this.getContainerMatrix();
    this.loadMap();
    setInterval(()=> {
       this.loadParticipants();
     },6000);
  }

  public getContainerMatrix = function(){
    this.windowWidth = window.innerWidth;
    this.windowHeight = window.innerHeight;
  }

  public loadMap = function(){
    this.apiService.getMapByEventId(this.eventId,(data)=>{
      // console.log(data);
      this.mapId = data.mapId;
      this.map = data;
      // console.log(this.map);
      // this.loadTable();
    },(err)=>{
      this.showErrorMessage("failed to load map")
      }
    );
  }

  // public loadTable = function(){
  //   this.apiService.getTablesByMapId(this.mapId,(data)=>{
  //     this.tables = data;
  //     // console.log(this.tables)
  //   },(err)=>{
  //     this.showErrorMessage("Failed to Load Table");
  //   });
  // }

  public loadParticipants = function(){
    var now  = new Date();
    var day = moment(now).format("YYYY-MM-DD");
    var time = moment(now).subtract(5,'seconds').format("HH:mm:ss");
    var nowApiString = day+"T"+time+"+08:00";
    console.log("now"+nowApiString);
    console.log(this.mapId);
    console.log(this.participants);
    // var nowApiString = "2018-10-25T16:37:25+08:00"
    this.apiService.getTrackings(this.mapId,nowApiString,(data)=>{
      console.log(data);
      this.participants = data.present;
    },(err)=>{
      console.log("failed to load participants");
    });

  }



}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { ToastrService } from 'ngx-toastr';
import * as moment from 'moment';

@Component({
  selector: 'app-booth-live-page',
  templateUrl: './booth-live-page.component.html',
  styleUrls: ['./booth-live-page.component.css']
})
export class BoothLivePageComponent implements OnInit {

  public eventId: number;
  public mapId : number;
  public participants: Array<any>;


  constructor(private route: ActivatedRoute,
              private router: Router,
              private apiService : ApiService,
              private toastr: ToastrService) {
    this.route.params.subscribe((param) => {
        this.eventId = param.id;
    });
  }

  ngOnInit() {
    this.loadMap();
    setInterval(()=> {
       this.loadParticipants();
       console.log(this.participants);
     },6000);
  }

  public loadMap = function(){
    this.apiService.getMapByEventId(this.eventId,(data)=>{
      // console.log(data);
      this.mapId = data.mapId;
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
      this.showErrorMessage("Failed to Load Table");
    });
  }

  public loadParticipants = function(){
    var now  = new Date();
    var day = moment(now).format("YYYY-MM-DD");
    var time = moment(now).subtract(5,'seconds').format("HH:mm:ss");
    var nowApiString = day+"T"+time+"+08:00";
    console.log("now"+nowApiString);
    // var nowApiString = "2018-07-08T08:00:25+08:00"
    this.apiService.getTrackings(this.mapId,nowApiString,(data)=>{
      console.log(data);
      this.participants = data.present;
    },(err)=>{
      console.log("failed to load participants");
    });

  }



}

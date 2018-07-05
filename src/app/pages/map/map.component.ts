import { Component, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as d3 from "d3";
// import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
// import {MapDialogComponent} from '../components/map-dialog'


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  public pageName: string = 'map';
  private eventId: number;

  public mapExistence: boolean = false;
  public map: any;
  public scaleOptions: Array<number>;
  public windowWidth: number;
  public windowHeight: number;
  constructor(private route: ActivatedRoute) {
    this.route.params.subscribe((param) => {
        this.eventId = param.id;
    });
    // this.map = {
    //   width: 0,
    //   height: 0,
    //   scale: 0
    // };
    // this.scaleOptions = [
    //   1 , 2 , 5
    // ]
    this.map = {
      width : 12,
      height: 18,
      scale: 2
    }
    this.windowWidth = window.innerWidth;
    this.windowHeight = window.innerHeight+100;
  }

  ngOnInit(){
    this.checkMap();
  }

  public loadMap = function(){
    this.apiService.getAttendees((data)=>{
      console.log(data);
      this.attendeeList= data;
    }, (err)=>{
      console.log(err);
      this.toastr.showErrorMessage();
    })
  }

  public checkMap = function(){
    if(this.map.width == 0 || this.map.height ==0 || this.map.scale == 0){
      this.mapExistence = false;
    }else {
      this.mapExistence = true;
      this.drawMap();
    }
  }

  public drawMap = function(){
  }
}

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
      width : 18,
      height: 12,
      scale: 2
    }
  }

  ngOnInit(){
    this.checkMap();
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

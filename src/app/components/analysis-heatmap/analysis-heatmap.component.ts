import { Component, OnInit, Input, OnChanges, SimpleChanges, ViewChild,ElementRef } from '@angular/core';
import { DaoService } from '../../services/dao.service';
import { ApiService } from '../../services/api.service';
import { ToastrService } from 'ngx-toastr';
import { DomSanitizer } from '@angular/platform-browser';


declare let h337: any;

@Component({
  selector: 'app-analysis-heatmap',
  templateUrl: './analysis-heatmap.component.html',
  styleUrls: ['./analysis-heatmap.component.scss']
})
export class AnalysisHeatmapComponent implements OnInit {

  @Input() eventId :number;
  public programChosen: number;
  public scheduleId:number;
  public max: number =0;
  public min: number = 0;
  public schedulesArray: Array<any> = [];
  public tPoints: any;
  public scheduleName: string = "";
  public heatmapInstance: any;
  public map: any;
  public ratio: number;
  constructor(private elRef: ElementRef,
              private daoService: DaoService,
              private apiService: ApiService,
              private toastr: ToastrService,
            private sanitizer: DomSanitizer) {


  }

  ngOnInit() {
    this.loadMap();
    this.loadSchedules();
  }

  public loadMap = function(){
    this.apiService.getMapByEventId(this.eventId,(data)=>{
      this.map = data;
      console.log(this.map);
      this.processRatio();
    },(err)=>{
      console.log(err);
      this.showErrorMessage("There is something wrong to load the map.");
    })
  };

  public processRatio = function(){
    this.ratio = Math.min(1000 / this.map.width, 500 /this.map.height)/5*4;
    console.log(this.ratio);
  }

  public loadSchedules = function(){
    let eventId = this.daoService.getEvent();
    // console.log(eventId);
    this.apiService.getSchedules(eventId,(data)=>{
      this.schedulesArray = data;
      this.programChosen = 0;
      console.log(this.schedulesArray);
      this.max = data.length;
    }, (err)=>{
      console.log(err);
      // this.showErrorMessage()
    });

  }

  public loadTrackingBySchedule = function(){
    let eventId = this.daoService.getEvent();
    console.log(this.programChosen);
    if(this.programChosen != 0){
      this.apiService.getAnalysisHeat(eventId,this.programChosen,(data)=>{
        if(this.heatmapInstance != undefined){
          var canvas = this.heatmapInstance._renderer.canvas;
          console.log(canvas);
          //remove the canvas from DOM
          canvas.remove();
        }
        this.tPoints = data;
        console.log(data);
        this.heatmap();
        this.scheduleName = this.schedulesArray[this.programChosen-1].description;
      })

    }
  }

  public playAnalysis = function(){
    let eventId = this.daoService.getEvent();
    this.scheduleId = 0;
    let index = 0;
    if(this.schedulesArray.length != 0){
      var interval = setInterval(()=>{
        this.scheduleId = this.schedulesArray[index++].scheduleId;
        this.apiService.getAnalysisHeat(eventId, this.scheduleId,(data)=>{
          if(this.heatmapInstance != undefined){
            var canvas = this.heatmapInstance._renderer.canvas;
            console.log(canvas);
            //remove the canvas from DOM
            canvas.remove();
          }
          this.tPoints = data;
          this.heatmap();
        });
        if(this.scheduleId== this.schedulesArray[this.schedulesArray.length-1].scheduleId){
          clearInterval(interval);
        }
      },2000);
    }
  }



  heatmap(){


    // minimal heatmap instance configuration
    this.heatmapInstance = h337.create({
      // only container is required, the rest will be defaults
      container: document.querySelector('.heatmap')
    });



    // now generate some random data
    // var points = [];
    // var max = 0;
    var width = 120;
    var height = 180;
    // var len = 50;
    this.tPoints.max = 10;
    for(let point of this.tPoints.data){
      point.x = point.x *this.ratio;
      point.y = this.map.height*this.ratio - point.y*this.ratio+36;
    }

    // while (len--) {
    //   var val = Math.floor(Math.random()*100);
    //   max = Math.max(max, val);
    //   var point = {
    //     // x: 60,
    //     // y: 90,
    //     x: Math.floor(Math.random()*width),
    //     y: Math.floor(Math.random()*height),
    //     value: val
    //   };
    //   points.push(point);
    // }
    // heatmap data format
    // var data = {
    //   max: max,
    //   data: points
    // };
    // if you have a set of datapoints always use setData instead of addData
    // for data initialization

    this.heatmapInstance.setData(this.tPoints);
    console.log(this.heatmapInstance);
  }
}

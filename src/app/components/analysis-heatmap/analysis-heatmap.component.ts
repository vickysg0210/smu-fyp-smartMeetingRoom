import { Component,ElementRef, OnInit } from '@angular/core';
import { DaoService } from '../../services/dao.service';
import { ApiService } from '../../services/api.service';


declare let h337: any;

@Component({
  selector: 'app-analysis-heatmap',
  templateUrl: './analysis-heatmap.component.html',
  styleUrls: ['./analysis-heatmap.component.css']
})
export class AnalysisHeatmapComponent implements OnInit {

  public programChosen: number;
  public max: number =0;
  public min: number = 0;
  public schedulesArray: Array<any> = [];
  public tPoints: any;
  public scheduleName: string = "";
  public heatmapInstance: any;
  constructor(private elRef: ElementRef, private daoService: DaoService,private apiService: ApiService) {


  }

  ngOnInit() {
    this.loadSchedules();
  }

  public loadSchedules = function(){
    let eventId = this.daoService.getEvent();
    // console.log(eventId);
    this.apiService.getSchedules(eventId,(data)=>{
      console.log(data);
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
      point.x = 900 - point.x *50;
      point.y = 600 - point.y*50;
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

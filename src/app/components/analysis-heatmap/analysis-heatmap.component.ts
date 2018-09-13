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
  public max: number;
  public min: number = 1;
  public schedulesArray: Array<any> = [];
  public schedulesArrayCome = false;

  constructor(private elRef: ElementRef, private daoService: DaoService,private apiService: ApiService) {
  }

  ngOnInit() {
    this.loadSchedules();
    this.heatmap();
  }

  public loadSchedules = function(){
    let eventId = this.daoService.getEvent();
    // console.log(eventId);
    this.apiService.getSchedules(eventId,(data)=>{
      console.log(data);
      this.schedulesArray = data;
      console.log(this.schedulesArray);
      this.programChosen = 1;
      this.max = data.length;
      this.schedulesArrayCome = true;

    }, (err)=>{
      console.log(err);
      // this.showErrorMessage()
    });

  }

  formatLabel(value: number) {
    console.log(value);
    if(value == 0){
      value =1;
    }else{
      console.log(this.schedulesArray);
    }

    if (value >= 1000) {
      return Math.round(value / 1000) + 'k';
    }

    return value;

  }



  heatmap(){
    // minimal heatmap instance configuration
    var heatmapInstance = h337.create({
      // only container is required, the rest will be defaults
      container: document.querySelector('.heatmap')
    });

    // now generate some random data
    var points = [];
    var max = 0;
    var width = 120;
    var height = 180;
    var len = 50;

    while (len--) {
      var val = Math.floor(Math.random()*100);
      max = Math.max(max, val);
      var point = {
        // x: 60,
        // y: 90,
        x: Math.floor(Math.random()*width),
        y: Math.floor(Math.random()*height),
        value: val
      };
      points.push(point);
    }
    // heatmap data format
    var data = {
      max: max,
      data: points
    };
    // if you have a set of datapoints always use setData instead of addData
    // for data initialization
    heatmapInstance.setData(data);

  }
}

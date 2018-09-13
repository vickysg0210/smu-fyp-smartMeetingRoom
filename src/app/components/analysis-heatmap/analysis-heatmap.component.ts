import { Component,ElementRef, OnInit } from '@angular/core';

declare let h337: any;

@Component({
  selector: 'app-analysis-heatmap',
  templateUrl: './analysis-heatmap.component.html',
  styleUrls: ['./analysis-heatmap.component.css']
})
export class AnalysisHeatmapComponent implements OnInit {


  constructor(private elRef: ElementRef) { }

  ngOnInit() {
    this.heatmap();
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

import { Component, OnInit, Input,OnChanges } from '@angular/core';
import * as d3Scale from 'd3-scale';

@Component({
  selector: 'app-treemap-industry',
  templateUrl: './treemap-industry.component.html',
  styleUrls: ['./treemap-industry.component.css']
})
export class TreemapIndustryComponent implements OnInit {

  @Input() industry: any;
  constructor() { }

  ngOnInit() {
    this.colorScale = this.generateColorScale();
  }

  ngOnChanges(k:any){
    // this.colorScale = this.generateColorScale();
  }

  industryView : any[] = [300,300];
  colorScale: any;
  generateColorScale(){
    const values : number[] = this.industry.map(s =>s.value);
    return d3Scale.scaleLinear()
                  .domain([Math.min(...values),(Math.max(...values)-Math.min(...values))/3+Math.min(...values),(Math.max(...values)-Math.min(...values))/3*2+Math.min(...values),Math.max(...values)])
                  .range(["#FFBF00","#FF7733","#C75146","#81171B"]);
  }

  customColors = (name) =>{
    const value = this.industry.find(s=>s.name === name).value;
    return this.colorScale(value);
  }

}

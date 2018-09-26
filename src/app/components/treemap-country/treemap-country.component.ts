import { Component, OnInit, Input,OnChanges } from '@angular/core';
import * as d3Scale from 'd3-scale';

@Component({
  selector: 'app-treemap-country',
  templateUrl: './treemap-country.component.html',
  styleUrls: ['./treemap-country.component.css']
})
export class TreemapCountryComponent implements OnInit {

  @Input()
  country: any;
  constructor() {

  }

  ngOnChanges(k: any)	{
    // console.log(k);
    // this.colorScale = this.generateColorScale();

  }



  countryView: any[]=[300,300];
  colorScale: any;

  generateColorScale(){
    // console.log(value);
    console.log(this.country);
    const values: number[] = this.country.map(s=>s.value);
    return d3Scale.scaleLinear()
                  .domain([Math.min(...values),(Math.max(...values)-Math.min(...values))/3+Math.min(...values),(Math.max(...values)-Math.min(...values))/3*2+Math.min(...values),Math.max(...values)])
                  .range(["#22AAA1","#4CE0D2","#84CAE7","#445E93"]);
  }

  customColors = (name) =>{
    // console.log(this.country);
    const value = this.country.find(s=>s.name === name).value;
    return this.colorScale(value);
  }

  formatCountry(value): string {
    // value.value = value.value * 100;
    // return value.value.toString()+"%";
    console.log(value.toFixed(1));
    return value.toFixed(2)*100 + "%";
  }

  ngOnInit() {
    this.colorScale = this.generateColorScale();
  }

}

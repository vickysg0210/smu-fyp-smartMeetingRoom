import { Component, OnInit,Input } from '@angular/core';
import * as d3 from "d3";
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-atte-analysis',
  templateUrl: './atte-analysis.component.html',
  styleUrls: ['./atte-analysis.component.css']
})
export class AtteAnalysisComponent implements OnInit {

  // @Input() attendances: Array<any>;
  constructor(private apiService: ApiService) {
    // console.log(this.attendances);
  }

  ngOnInit() {
  }

  ngAfterContentInit(){
    console.log("content");
    // set the dimensions and margins of the graph
var margin = {top: 20, right: 20, bottom: 30, left: 50};
var width = 960 - margin.left - margin.right;
var height = 500 - margin.top - margin.bottom;

// parse the date / time
var parseTime = d3.timeParse("%Y");

// set the ranges
var x = d3.scaleTime().range([0, width]);
var y = d3.scaleLinear().range([height, 0]);

// define the line
var valueline = d3.line()
    .x(function(d) { return x(d.time); })
    .y(function(d) { return y(d.number); });
// define the line
// var valueline2 = d3.line()
//     .x(function(d) { return x(d.Date); })
//     .y(function(d) { return y(d.Exports); });

// append the svg obgect to the body of the page
// appends a 'group' element to 'svg'
// moves the 'group' element to the top left margin
  let svg = d3.select(".atte-analysis").append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

    console.log(svg);
// Get the data
    d3.json("assets/data.json", function(data) {
      // if (error) throw error;
      console.log(data);
      // trigger render
      this.draw(data,svg,x,y,valueline,height);
    });
  }

  public draw = function (data,svg,x,y,valueline,height) {
    var parseTime = d3.timeParse("%H:%M:%S");

    // var data = data[country];

    // format the data
    data.forEach(function(d) {
        d.time = parseTime(d.time);
    });

    // sort years ascending
    // data.sort(function(a, b){
    //   return a["Date"]-b["Date"];
  	// })

    // Scale the range of the data
    x.domain(d3.extent(data, function(d) { return d.time; }));
    y.domain([0, d3.max(data, function(d) {
  	  return d.number; })]);

    // Add the valueline path.
    svg.append("path")
        .data([data])
        .attr("class", "line")
        .attr("d", valueline);
    // Add the valueline path.
    // svg.append("path")
    //     .data([data])
    //     .attr("class", "line")
    //     .attr("d", valueline2);
    // Add the X Axis
    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));

    // Add the Y Axis
    svg.append("g")
        .call(d3.axisLeft(y));
    }


}

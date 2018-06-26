import { Component, OnInit, Input,
AfterContentInit} from '@angular/core';
import * as d3 from "d3";

@Component({
  selector: 'app-d3-map-container',
  templateUrl: './d3-map-container.component.html',
  styleUrls: ['./d3-map-container.component.css']
})
export class D3MapContainerComponent implements OnInit {

  @Input() map: any;
  public tables: Array<any>;
  public containerWidth : number;
  public containerHeight: number;
  public x: any;
  public y: any;

  public
  constructor() {
    this.tables = [{
        radius: 0.8,
        tableX: 1.5,
        tableY: 4,
        shape: "square"
      },
      {
        radius: 0.8,
        tableX: 3,
        tableY: 4,
        shape: "circle"
      },{
        radius: 0.8,
        tableX: 6,
        tableY: 4,
        shape: "circle"
      },{
        radius: 0.8,
        tableX: 7.5,
        tableY: 4,
        shape: "circle"
      },{
        radius: 0.8,
        tableX: 1.5,
        tableY: 1.5,
        shape: "circle"
      },
      {
        radius: 0.8,
        tableX: 3,
        tableY: 1.5,
        shape: "circle"
      },
      {
        radius: 0.8,
        tableX: 6,
        tableY: 1.5,
        shape: "circle"
      },
      {
        radius: 0.8,
        tableX: 7.5,
        tableY: 1.5,
        shape: "circle"
      }
    ];
  }

  ngOnInit() {
    this.getMapContainerMatrix();
  }

  public getMapContainerMatrix = function(){
    let windowWidth = window.innerWidth;
    let windowHeight = window.innerHeight;

    this.containerWidth = windowWidth - 152;
    this.containerHeight = windowHeight-200;
    this.x = d3.scaleLinear().range([0,this.map.width*40]);
    this.y = d3.scaleLinear().range([this.map.height*40,0]);
    // Scale the range of the data
      // x.domain(d3.extent(data, function(d) { return d.date; }));
      // y.domain([0, d3.max(data, function(d) { return d.close; })]);
  }

  public addTable = function(){
    this.tables.push({
      radius: 0,
      tableX: 0,
      tableY: 0,
      shape: "circle"
    })
  }

  public removeTable = function(index: number){
    console.log(index);
    this.tables.splice(index,1);
    console.log(this.tables);
    this.drawTableOnMap();
  }
  ngAfterContentInit(){
  // success
    // let container = d3.select('.map-container')
    //   .append('svg')
    //   .attr('width', 1000)
    //   .attr('height', 1000)
    //   .style("fill", "blue");;
    //
    //   let mapArea = container.append('svg')
    //             .attr("x",100)
    //             .attr("y",100)
    //             .attr("width", this.map.width*40)
    //             .attr("height", this.map.height*40)
    //             .style("fill", "blue");
    //
    //   let tables = mapArea.selectAll("rect")
    //                       .data(this.table)
    //                       .enter()
    //                       .append("rect")
    //                       .style("stroke-width","4");;
    //
    //   let tablesAttributes = tables
    //                           .attr("x", function(d){return d.tableX})
    //                           .attr("y", function(d){return d.tableY})
    //                           .attr("rx",function(d){return d.radius;})
    //                           .attr("ry", function(d){return d.radius;})
    //                           .attr("width",function(d){return d.radius;})
    //                           .attr("height", function(d){return d.radius})
    //                           .style("fill","red");

    let margin = {top: 20, right: 20, bottom: 30, left: 50};
    let widthRatio = this.map.width / this.map.scale;
    let heightRatio = this.map.height / this.map.scale;
    let container = d3.select('.map-container')
      .append('svg')
      .attr('width', this.containerWidth + margin.right + margin.left)
      .attr('height', this.containerHeight + margin.top +margin.bottom)
      .append("g")
      .attr("transform",
      "translate("+margin.left +
      ","+margin.top+")");


    container.append("g")
      .attr("class","xgrid")
      .attr("transform", "translate(0," + this.map.height*40 + ")")
      .call(this.make_x_gridlines()
          .tickSize(-this.map.height*40)
          .tickFormat(""));

    container.append("g")
      .attr("class", "ygrid")
      .call(this.make_y_gridlines()
          .tickSize(-this.map.width*40)
          .tickFormat(""));

    container.append("g")
      .attr("transform", "translate(0," + this.map.height*40 + ")")
      .call(d3.axisBottom(this.x).tickFormat(function(d){
          return (widthRatio*d).toFixed(1);
        }));

    container.append("g")
            .call(d3.axisLeft(this.y).tickFormat(
              function(d){
                return (heightRatio*d).toFixed(1);
              }
            ));

    //format gridlines
    container.selectAll(".tick:not(:first-of-type) line").
                  attr("stroke", "#777").
                  attr("stroke-dasharray", "2");

//table
    this.drawTableOnMap();

            // container.selectAll("rect")
            //         .attr("x", function(d){ return d.tableX; })
            //         .attr("y", function(d){ return d.tableY; })
            //         .attr("width", function(d){ return d.radius;})
            //         .attr("height", function(d){ return d.radius});
  }

  public make_x_gridlines = function(){
    return d3.axisBottom(this.x).ticks(this.map.width/this.map.scale);
  }

  public make_y_gridlines = function(){
    return d3.axisLeft(this.y).ticks(this.map.height/this.map.scale);
  }

  public drawTableOnMap = function(){
    let margin = {top: 20, right: 20, bottom: 30, left: 50};

      let widthRatio = this.map.width / this.map.scale;
      let heightRatio = this.map.height / this.map.scale;
       let tableG = d3.select('.map-container svg')
       let tableContainer = tableG.append("g")
                                .attr("class","tables")
                                // .attr('width', this.containerWidth + margin.right + margin.left)
                                // .attr('height', this.containerHeight + margin.top +margin.bottom)
                                .attr("transform",
                                "translate("+margin.left +
                                ","+margin.top+")");

       tableContainer.selectAll(".table")
                .data(this.tables)
                .enter()
                .append("image")
                .attr("xlink:href", "https://s3-ap-southeast-1.amazonaws.com/com.viatick/bms/medias/1529997346512table.png")
                .attr("x", function(d){return (d.tableX-d.radius/2) *80})
                .attr("y", function(d){return (heightRatio- d.tableY-d.radius/2)*80})
                .attr("width", function(d){return d.radius*80})
                .attr("height",function(d){return d.radius*80})

      tableContainer.selectAll(".table")
               .data(this.tables)
               .enter()
               .append("text")
                .attr("x", function(d){return (d.tableX) *80-5)
                .attr("y", function(d){return (heightRatio- d.tableY+d.radius/2)*80})
                .attr("dy", ".35em")
                .text(function(d,i) { return i+1; });
                // .attr("cx",function(d){return d.tableX*80})
                // .attr("cy", function(d){return (heightRatio- d.tableY) *80})
                // .attr("r",function(d){return d.radius*80})
                // .text(function(d,i){return i+1;})
                // .attr('color', "white");
      // tableContainer.selectAll("rect")
      //           .data(this.tables.filter(function(d){ return d.shape == 'rect'}))
      //           .enter()
      //           .append("rect")
      //           .attr("x",function(d){return d.tableX*80})
      //           .attr("y", function(d){return (heightRatio- d.tableY) *80})
      //           .attr("width",function(d){return d.radius*80})
      //           .attr("height", function(d){return d.radius*80})
      //           .text(function(d,i){return i+1;});
  }

}

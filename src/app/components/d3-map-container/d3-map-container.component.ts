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
  @Input() customized: boolean;
  @Input() participants: Array<any>;

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
    this.containerHeight = windowHeight-180;
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
    this.drawParticipantsOnMap();
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
                .attr("x", function(d){return d.tableX*80-5;})
                .attr("y", function(d){return (heightRatio- d.tableY+d.radius/2)*80})
                .attr("dy", ".35em")
                .text(function(d,i) { return i+1; });
  }


  public drawParticipantsOnMap = function(){
    let margin = {top: 20, right: 20, bottom: 30, left: 50};
    let imageConfig = 40;

    let widthRatio = this.map.width / this.map.scale;
    let heightRatio = this.map.height / this.map.scale;
    let mapHeight = this.map.height;
    let mapWidth = this.map.width;
    let mapScale = this.map.scale;
    let imageLength = 40;
    let participantG = d3.select('.map-container svg');

    let defs = participantG.append('svg:defs');
    let participantId = this.participants.forEach(function(d,i){
      defs.append("svg:pattern")
          .attr("id","avatar"+i)
          .attr("width",1000)
          .attr("height",1000)
          .attr("patternUnits", "userSpaceOnUse")
          .append("svg:image")
          .attr("xlink:href", d.avatar.url)
          .attr("width", imageConfig)
          .attr("height", imageConfig)
          .attr("x", d.coordinateX/mapScale*80-imageConfig/2)
          .attr("y", (mapHeight- d.coordinateY)/mapScale*80-imageConfig/2);

    });

    var circle = participantG.selectAll("circle")
      .data(this.participants)
      .enter()
      .append("circle")
      .attr("transform", "translate(" +50 + "," +20
       + ")")
      .attr("cx", function(d){return d.coordinateX/mapScale*80})
      .attr("cy", function(d){return (mapHeight-d.coordinateY)/mapScale*80})
      .attr("r", imageConfig/2)
      .style("fill", "#fff")
      .style("fill", function(d,i){return "url(#avatar" + i + ")";})
      .on("click", function(d){
        d.coordinateX = 60;
        console.log(d);
      })
  }
}

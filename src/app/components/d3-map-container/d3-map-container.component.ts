import { Component, OnInit, Input,
AfterContentInit,ViewChild,
ElementRef,
OnChanges, SimpleChanges} from '@angular/core';
import * as d3 from "d3";
import { ApiService } from '../../services/api.service';
import { Tracking } from'../../interfaces/tracking';
import { Participant } from'../../interfaces/participant';



@Component({
  selector: 'app-d3-map-container',
  templateUrl: './d3-map-container.component.html',
  styleUrls: ['./d3-map-container.component.css']
})
export class D3MapContainerComponent implements OnInit {

  @Input() map: any;
  // @Input() tables: Array<any>;
  public containerWidth : number;
  public containerHeight: number;
  public x: any;
  public y: any;
  @Input() customized: boolean;
  @Input() participants: Array<Tracking>;
  // public participants: Array<any>;
  @Input() windowWidth: number;
  @Input() windowHeight: number;

  constructor(private apiService : ApiService) {
  }

  ngOnChanges(){
    this.containerWidth = this.windowWidth;
    this.containerHeight = this.windowHeight;
    this.x = d3.scaleLinear().range([0,this.map.width*50]);
    this.y = d3.scaleLinear().range([this.map.height*50,0]);
    if(this.participants.length != 0){
      let div = d3.select('.map-container')
      div.selectAll("*").remove();
      this.ngAfterContentInit();
      // this.drawParticipantsOnMap();
    }
  }

  ngOnInit() {
    this.getMapContainerMatrix();

  }



  public getMapContainerMatrix = function(){
    this.containerWidth = this.windowWidth/5*4;
    this.containerHeight = this.windowHeight/4*3;
    this.x = d3.scaleLinear().range([0,this.map.width*50]);
    this.y = d3.scaleLinear().range([this.map.height*50,0]);
  }

  // public loadParticipants = function(){
  //   this.apiService.getTrackings("2018-07-03T22:38:00+08:00",(data)=>{
  //     this.trackings = data;
  //     this.processTrackings();
  //   },(err)=>{
  //     console.log("failed to load participants");
  //   });
  // }
  //
  // public processTrackings = function(){
  //   for(let tracking in trackings){
  //     if(tracking.coordinateX != -100 || tracking.coordinateY == -100){
  //       this.absentParticipants.push(tracking.participant);
  //     }else{
  //       this.participants.push(tracking);
  //     }
  //   }
  // }

  ngAfterContentInit(){
    console.log(this.map);
    console.log(this.participants);
    let margin = {top: 5, right: 20, bottom: 30, left: 50};
    let widthRatio = this.map.width / this.map.scale;
    let heightRatio = this.map.height / this.map.scale;
    let container = d3.select('.map-container')
      .append('svg')
      .attr('width', this.windowWidth/5*3)
      .attr('height', this.windowHeight/4*3)
      .append("g")
      .attr("transform",
      "translate("+margin.left +
      ","+margin.top+")");

    // container.append("svg:image")
    // .attr(
    //   "xlink: href": "https://www.google.com/url?sa=i&rct=j&q=&esrc=s&source=images&cd=&ved=2ahUKEwiJrZ632dLdAhULqY8KHR1KAeUQjRx6BAgBEAU&url=https%3A%2F%2Fwww.birdlife.org%2Fworldwide%2Fnews%2Feven-familiar-birds-risk-extinction-new-study-finds&psig=AOvVaw0pXcG9J_atyWgNdU3CC6JJ&ust=1537846135989497"
    // )
    // .attr("height",1000)
    // .attr("width",1000)


    container.append("g")
      .attr("class","xgrid")
      .attr("transform", "translate(0," + this.map.height*50 + ")")
      .call(this.make_x_gridlines()
          .tickSize(-this.map.height*50)
          .tickFormat(""));

    container.append("g")
      .attr("class", "ygrid")
      .call(this.make_y_gridlines()
          .tickSize(-this.map.width*50)
          .tickFormat(""));

    container.append("g")
      .attr("transform", "translate(0," + this.map.height*50 + ")")
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
    console.log(this.participants);
    // this.drawTableOnMap();
    this.drawParticipantsOnMap();
  }

  public make_x_gridlines = function(){
    return d3.axisBottom(this.x).ticks(this.map.width/this.map.scale);
  }

  public make_y_gridlines = function(){
    return d3.axisLeft(this.y).ticks(this.map.height/this.map.scale);
  }

  // public drawTableOnMap = function(){
  //   let margin = {top: 20, right: 20, bottom: 30, left: 50};
  //
  //     let widthRatio = this.map.width / this.map.scale;
  //     let heightRatio = this.map.height / this.map.scale;
  //      let tableG = d3.select('.map-container svg')
  //      let tableContainer = tableG.append("g")
  //                               .attr("class","tables")
  //                               // .attr('width', this.containerWidth + margin.right + margin.left)
  //                               // .attr('height', this.containerHeight + margin.top +margin.bottom)
  //                               .attr("transform",
  //                               "translate("+margin.left +
  //                               ","+margin.top+")");
  //
  //      tableContainer.selectAll(".table")
  //               .data(this.tables)
  //               .enter()
  //               .append("image")
  //               .attr("xlink:href", "https://s3-ap-southeast-1.amazonaws.com/com.viatick/bms/medias/1530338218430table.jpg")
  //               .attr("x", function(d){return (d.tableX-d.radius) *40})
  //               .attr("y", function(d){return (heightRatio- d.tableY-d.radius)*40})
  //               .attr("width", function(d){return d.radius*40*2})
  //               .attr("height",function(d){return d.radius*40*2})
  //
  //     tableContainer.selectAll(".table")
  //              .data(this.tables)
  //              .enter()
  //              .append("text")
  //               .attr("x", function(d){return d.tableX*40-5;})
  //               .attr("y", function(d){return (heightRatio- d.tableY+d.radius)*40})
  //               .attr("dy", ".35em")
  //               .text(function(d,i) { return i+1; });
  // }


  public drawParticipantsOnMap = function(){
    console.log("interval");
    let margin = {top: 30, right: 20, bottom: 30, left: 100};
    let imageConfig = 30;

    let widthRatio = this.map.width / this.map.scale;
    let heightRatio = this.map.height / this.map.scale;
    let mapHeight = this.map.height;
    let mapWidth = this.map.width;
    let mapScale = this.map.scale;
    let imageLength = 50;
    let participantG = d3.select('.map-container svg')
    .attr("transform",
    "translate("+margin.left +
    ","+margin.top+")");


    let defs = participantG.append('svg:defs');
    console.log(this.participants);
    // if(this.participants){
      let participantId = this.participants.forEach(function(d,i){
        let participantData : Participant = d.participant;
        // console.log(participantData);
        // console.log(participantData.remark);
        defs.append("svg:pattern")
            .attr("id","avatar"+i)
            .attr("width",1000)
            .attr("height",1000)
            .attr("patternUnits", "userSpaceOnUse")
            .append("svg:image")
            .attr("xlink:href", d.participant.remark)
            .attr("width", imageConfig)
            .attr("height", imageConfig)
            .attr("x", d.coordinateX*50-imageConfig/2)
            .attr("y", (mapHeight- d.coordinateY)*50-imageConfig/2);
    // }


    });

    var circle = participantG.selectAll("circle")
      .data(this.participants)
      .enter()
      .append("circle")
      .attr("transform", "translate(" +50 + "," +20
       + ")")
      .attr("cx", function(d){return d.coordinateX/mapScale*50})
      .attr("cy", function(d){return (mapHeight-d.coordinateY)/mapScale*50})
      .attr("r", imageConfig/2)
      .style("fill", "#fff")
      .style("fill", function(d,i){return "url(#avatar" + i + ")";})
      .on("click", function(d){
        d.participant.speaking = 1;
        console.log(d);
      })
  }
}

import { Component, OnInit, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-map-image',
  templateUrl: './map-image.component.html',
  styleUrls: ['./map-image.component.scss']
})
export class MapImageComponent implements OnInit {

  @Input() windowWidth: number;
  @Input() windowHeight: number;
  @Input() participants: Array<any>;
  @Input() map: any;
  public ratio: number;
  // public containerWidth : number;
  // public containerHeight: number;
  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit() {
    console.log(this.map);
    console.log(this.windowWidth);
    console.log(this.windowHeight);
    this.processRatio();
  }

  ngOnChanges(){

    console.log("width"+ this.windowWidth);
    console.log("height" +this.windowHeight);
    this.processRatio()
  }

  public processRatio = function(){
    this.ratio = Math.min(this.windowWidth/7*4 / this.map.width, this.windowHeight/4*3 /this.map.height)/5*4;
    console.log(this.ratio);
  }

}

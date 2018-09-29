import { Component, OnInit, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';

@Component({
  selector: 'app-map-image',
  templateUrl: './map-image.component.html',
  styleUrls: ['./map-image.component.scss']
})
export class MapImageComponent implements OnInit {

  @Input() windowWidth: number;
  @Input() windowHeight: number;
  public containerWidth : number;
  public containerHeight: number;
  constructor() { }

  ngOnInit() {

  }

  ngOnChanges(){
    this.containerWidth = this.windowWidth;
    this.containerHeight = this.windowHeight;
    console.log("width"+ this.windowWidth);
    console.log("height" +this.windowHeight);
  }

}

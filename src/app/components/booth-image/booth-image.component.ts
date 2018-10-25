import { Component, OnInit, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-booth-image',
  templateUrl: './booth-image.component.html',
  styleUrls: ['./booth-image.component.scss']
})
export class BoothImageComponent implements OnInit {

  @Input() windowWidth: number;
  @Input() windowHeight: number;
  @Input() participants: Array<any>;
  @Input() map: any;
  public ratio: number;

  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.processRatio();
  }

  ngOnChanges(){
    this.processRatio();
  }

  public processRatio = function(){
    this.ratio = Math.min(this.windowWidth/ this.map.width, this.windowHeight/this.map.height)/5*4;
    console.log(this.ratio);
  }

}

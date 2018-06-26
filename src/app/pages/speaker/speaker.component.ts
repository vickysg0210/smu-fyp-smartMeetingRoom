import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-speaker',
  templateUrl: './speaker.component.html',
  styleUrls: ['./speaker.component.scss']
})
export class SpeakerComponent implements OnInit {

  public pageName: string = 'speaker';
  avatar: string = 'http://www.worldcitiessummit.com.sg/sites/default/files/styles/people_listing_c_145_x_145_/public/gwb_peoples/michele.jpg?itok=SxgIGXvz';
  speaking: boolean;
  constructor() { }

  ngOnInit() {
  }

  toFullScreen() {
    window.open('/speaker-full', '_blank');
  }
}
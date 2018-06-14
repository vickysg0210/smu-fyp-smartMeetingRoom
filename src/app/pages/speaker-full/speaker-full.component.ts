import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-speaker-full',
  templateUrl: './speaker-full.component.html',
  styleUrls: ['./speaker-full.component.scss']
})
export class SpeakerFullComponent implements OnInit {

  avatar: string = 'http://www.worldcitiessummit.com.sg/sites/default/files/styles/people_listing_c_145_x_145_/public/gwb_peoples/michele.jpg?itok=SxgIGXvz';
  speaking: boolean;
  constructor() { }

  ngOnInit() {
  }

}

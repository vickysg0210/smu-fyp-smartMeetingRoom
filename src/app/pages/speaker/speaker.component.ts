import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-speaker',
  templateUrl: './speaker.component.html',
  styleUrls: ['./speaker.component.scss']
})
export class SpeakerComponent implements OnInit {

  public pageName: string = 'speaker';
  avatar: string = 'http://www.worldcitiessummit.com.sg/sites/default/files/styles/people_listing_c_145_x_145_/public/gwb_peoples/michele.jpg?itok=SxgIGXvz';
  speaking: boolean;
  private eventId: number;

  constructor(private route: ActivatedRoute) {
      this.route.params.subscribe((param)=>{
          this.eventId = param.id;
      });
  }

  ngOnInit() {
  }

  toFullScreen() {
    window.open('/speaker-full', '_blank');
  }
}

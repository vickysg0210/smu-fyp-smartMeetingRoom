import { Component, OnInit, Directive, Input, ViewChild} from '@angular/core';
import { MatSidenav } from '@angular/material';

@Component({
  selector: 'app-attendees',
  templateUrl: './attendees.component.html',
  styleUrls: ['./attendees.component.scss']
})
export class AttendeesComponent implements OnInit {
  @ViewChild('sidenav') sidenav : MatSidenav;
  attendeesList;
  public pageName: string = "attendees";

  constructor() {
   }



  ngOnInit() {
    this.attendeesList = {
        attendees: [{
          'name': "MICHELE ACUTO",
          'uuid': 4534525,
          'position': "Professor of Urban Politics",
          'organization': "Melbourne School of Design",
          'avatar' : "http://www.worldcitiessummit.com.sg/sites/default/files/styles/people_listing_c_145_x_145_/public/gwb_peoples/michele.jpg?itok=SxgIGXvz"
        },{
          'name': "Bernise Ang",
          'uuid': 123425,
          'position': "Principal and Methodology Lead",
          'organization': "Zeroth Labs",
          'avatar' : "http://www.worldcitiessummit.com.sg/sites/default/files/styles/people_listing_c_145_x_145_/public/gwb_peoples/Bernise%20Ang.jpg?itok=pyjcRXVh"
        },{
          'name': "JACK BACKEN",
          'uuid': 145211,
          'position': "Director",
          'organization': "Cistri Pte Ltd, Singapore",
          'avatar' : "http://www.worldcitiessummit.com.sg/sites/default/files/styles/people_listing_c_145_x_145_/public/gwb_peoples/Jack-Backen-CV%20pic.jpg?itok=335C-fpR"
        },{
          'name': "MICHAEL BUDIG",
          'uuid': 4546232,
          'position': "Assistant Professor",
          'organization': "Singapore University of Technology and Design (SUTD)",
          'avatar' : "http://www.worldcitiessummit.com.sg/sites/default/files/styles/people_listing_c_145_x_145_/public/gwb_peoples/Snip20180213_34.png?itok=kxx_rndH"
        },{
          'name': "RAYMOND CHETTI",
          'uuid': 462557534,
          'position': "Co-founder & CEO",
          'organization': "CRE Korea (Commercial Real Estate Korea)",
          'avatar' : "http://www.worldcitiessummit.com.sg/sites/default/files/styles/people_listing_c_145_x_145_/public/gwb_peoples/Snip20180307_3.png?itok=iwiaAkeW"
        }]
    }
  }

  public toggleNav = function(){
    this.sidenav.toggle();
  }

}

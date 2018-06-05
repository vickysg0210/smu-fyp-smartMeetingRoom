import { Component, OnInit } from '@angular/core';
import { DaoService } from '../../services/dao.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-event-mgmt-page',
  templateUrl: './event-mgmt-page.component.html',
  styleUrls: ['./event-mgmt-page.component.scss']
})
export class EventMgmtPageComponent implements OnInit {
    selected = [];
    public viewChange: string = "";
    public items;
    public isGrid: boolean = false;
    public page: string;

    displayedColumns = ['id', 'name', 'date', 'venue','description'];
    dataSource = ELEMENT_DATA;

    constructor(private daoService : DaoService, private router: Router) {
        router.events.subscribe((res)=>{
          this.page = this.router.url;
        })
        this.items = {
            events: [{
                'id': 1,
                'name': "Event 1",
                'date': "7/15/2018",
                'venue': "MBS",
                'description': "This is a description for the event"
            },{
                'id': 2,
                'name': "Event 2",
                'date': "7/15/2018",
                'venue': "MBS",
                'description': "This is a description for the event"
            },{
                'id': 3,
                'name': "Event 3",
                'date': "7/15/2018",
                'venue': "MBS",
                'description': "This is a description for the event"
            },{
                'id': 4,
                'name': "Event 4",
                'date': "7/15/2018",
                'venue': "MBS",
                'description': "This is a description for the event"
            },{
                'id': 5,
                'name': "Event 5",
                'date': "7/15/2018",
                'venue': "MBS",
                'description': "This is a description for the event"
            }]
        }
    }

    ngOnInit() {
      let secret : string = this.daoService.getSecret();
      console.log("BTS "+secret);
      // if(secret == null){
      //   this.router.navigate(['/login']);
      // }
    }
    onSelect(e) {
        console.log("onselect event: ", e, e.path[0].id);
        this.router.navigate(['/event-mgmt', e.path[0].id]);
    }

    public changeView = function($event){
      this.viewChange = $event;
      if(this.viewChange == "view_list"){
        this.isGrid = true;
      } else {
        this.isGrid = false;
      }
    }
}

export interface Element {
  id: number;
  name: string;
  date: string;
  venue: string;
  description: string;
}

const ELEMENT_DATA: Element[] = [
  {
      id: 1,
      name: 'Event 1',
      date: '7/15/2018',
      venue: 'MBS',
      description: 'This is a description for the event'
  },{
      id: 2,
      name: "Event 2",
      date: "7/15/2018",
      venue: "MBS",
      description: "This is a description for the event"
  },{
      id: 3,
      name: "Event 3",
      date: "7/15/2018",
      venue: "MBS",
      description: "This is a description for the event"
  },{
      id: 4,
      name: "Event 4",
      date: "7/15/2018",
      venue: "MBS",
      description: "This is a description for the event"
  },{
      id: 5,
      name: "Event 5",
      date: "7/15/2018",
      venue: "MBS",
      description: "This is a description for the event"
  }
];

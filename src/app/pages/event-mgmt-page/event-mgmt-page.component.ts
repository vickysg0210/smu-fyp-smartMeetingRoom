import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ViewService } from '../../services/view.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-event-mgmt-page',
  templateUrl: './event-mgmt-page.component.html',
  styleUrls: ['./event-mgmt-page.component.scss']
})
export class EventMgmtPageComponent implements OnInit {
    selected = [];
    public items;
    public isGridView = true;

    public view_icon: string;
    public view_name: string;
    public isGrid: boolean;
    public page: string;

    displayedColumns = ['id', 'name', 'date', 'venue','description'];
    dataSource = ELEMENT_DATA;

    constructor(private user: AuthService, private viewService: ViewService, private router: Router) {
        viewService.isGridView$.subscribe(isGrid=>{
            console.log("subscribe called with isGrid: ",isGrid);
            this.isGridView = isGrid;
        })
        this.view_icon = 'view_list';
        this.view_name = 'List View';
        this.isGrid = true;
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
        console.log(this.user.getUserLoggedIn());
    }

    onSelect(e) {
        console.log("onselect event: ", e, e.path[0].id);
        this.router.navigate(['/event-mgmt', e.path[0].id]);
    }

    public changeView = function(){
      console.log("changeview called!!! with isGrid: ",this.isGrid);
      //change to list/grid view;
      if (this.view_icon == "view_list"){
        this.isGrid = false;
        // this.switched.emit(false);
        this.view_icon = 'view_module';
        this.view_name = 'Grid View';
        // this.viewService.toList();

      }else{
        this.isGrid = true;
        // this.switched.emit(true);
        // this.viewService.toGrid();
        this.view_icon = 'view_list';
        this.view_name = 'List View';
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

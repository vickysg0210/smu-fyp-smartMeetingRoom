import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ViewService } from '../../services/view.service';

@Component({
  selector: 'app-event-mgmt-page',
  templateUrl: './event-mgmt-page.component.html',
  styleUrls: ['./event-mgmt-page.component.scss']
})
export class EventMgmtPageComponent implements OnInit {
    public items;
    public isGridView = true;

    constructor(private user: AuthService, private viewService: ViewService) {
        viewService.isGridView$.subscribe(isGrid=>{
            console.log("subscribe called with isGrid: ",isGrid);
            this.isGridView = isGrid;
        })
        this.items = {
            events: [{
                'name': "Event1",
                'date': "7/15/2018",
                'venue': "MBS",
                'description': "This is a description for the event"
            },{
                'name': "Event2",
                'date': "7/15/2018",
                'venue': "MBS",
                'description': "This is a description for the event"
            },{
                'name': "Event3",
                'date': "7/15/2018",
                'venue': "MBS",
                'description': "This is a description for the event"
            },{
                'name': "Event4",
                'date': "7/15/2018",
                'venue': "MBS",
                'description': "This is a description for the event"
            },{
                'name': "Event5",
                'date': "7/15/2018",
                'venue': "MBS",
                'description': "This is a description for the event"
            }]
        }
    }

    ngOnInit() {
        console.log(this.user.getUserLoggedIn());
    }

}

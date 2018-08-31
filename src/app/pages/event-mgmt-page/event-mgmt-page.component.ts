import { Component, OnInit } from '@angular/core';
import { DaoService } from '../../services/dao.service';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';

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
    public pageName: string;
    public page: string;
    public dataSource: Array<any>;
    public accountId: number;

    displayedColumns = ['name', 'date', 'venue','description'];

    constructor(private daoService : DaoService, private router: Router,
      private apiService : ApiService) {
        router.events.subscribe((res)=>{
          this.page = this.router.url;
        })
        // this.route.params.subscribe((param)=>{
        //     this.accountId = param.id;
        // });
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
        this.pageName = "eventMgmt"
    }

    ngOnInit() {
      this.accountId = this.daoService.getAccount();
      this.loadEvents(this.accountId);
    }

    public loadEvents = function(accountId){
      this.apiService.getEvents(this.accountId,(data)=>{
        // this.daoService.storeAccount(data.account);
        // console.log(this.daoService.getAccount();
        // this.router.navigate(['/event-mgmt'])
        console.log(data);
        this.dataSource = data;
      }, (err)=>{
        console.log(err);
        // this.showErrorMessage()
      })
    }
    // onSelect(e) {
    //     console.log("onselect event: ", e, e.path[0].id);
    //     this.router.navigate([e.path[0].id, 'home']);
    // }

    selectRow(row) {
      this.router.navigate([row.eventId, 'home']);
      console.log(row);
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

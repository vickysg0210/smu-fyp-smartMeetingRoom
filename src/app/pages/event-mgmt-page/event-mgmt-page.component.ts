import { Component, OnInit } from '@angular/core';
import { DaoService } from '../../services/dao.service';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import * as moment from 'moment';

@Component({
  selector: 'app-event-mgmt-page',
  templateUrl: './event-mgmt-page.component.html',
  styleUrls: ['./event-mgmt-page.component.scss']
})
export class EventMgmtPageComponent implements OnInit {
    selected = [];
    // public viewChange: string = "";
    public items;
    public page: string;
    public dataSource: Array<any>;
    public accountId: number;
    public moment: any;


    displayedColumns = ['name', 'date', 'venue', 'status', 'actions'];

    constructor(private daoService : DaoService, private router: Router,
      private apiService : ApiService) {
        router.events.subscribe((res)=>{
          this.page = this.router.url;
        })
    }

    ngOnInit() {
      this.accountId = this.daoService.getAccount();
      this.loadEvents(this.accountId);
    }

    public loadEvents = function(accountId){
      this.apiService.getEvents(this.accountId,(data)=>{
        console.log(data);
        this.dataSource = data;
        for (let single of this.dataSource) {
          console.log("Date="+single.date);
          // single.date = single.date.substring(0, 10);
          var test = moment(single.date);
          console.log(test);
          console.log("Date="+single.date);
        }
      }, (err)=>{
        console.log(err);
        // this.showErrorMessage()
      })
    }

    public deleteEvent = function(eventId: string){
      console.log(eventId);
      this.apiService.deleteEvent(eventId, (data)=>{
        console.log(data);
        this.ngOnInit();
      },(err)=>{
        console.log(err);
      })
    }

    select(element) {
      this.daoService.storeEvent(element.eventId);
      this.router.navigate([element.eventId, 'home']);
    }

}

export interface Element {
  id: number;
  name: string;
  date: string;
  venue: string;
  actions: string;
}

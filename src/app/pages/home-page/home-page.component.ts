import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { DaoService } from '../../services/dao.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {


  public pageName: String = 'Home';
  public eventId: number;
  public dataSource: Array<any>;
  public eventStatus: string;
  public eventType: string;
  public accountId: number;
  public started: boolean;
  public inprogress: boolean;
  public ended: boolean;
  public booth: boolean = false;
  public event: any;
  // ifIsBefore: boolean;
  // ifIsDuring: boolean;
  // ifIsAfter: boolean;

  constructor( public router: Router,
              private route: ActivatedRoute,
              private daoService: DaoService,
              private apiService: ApiService) {
    this.route.params.subscribe((param) => {
        this.eventId = +param.id;
    });
  }

  ngOnInit() {
    this.accountId = this.daoService.getAccount();
    this.getEventStatus();
    // this.disableDecision();
  }


  public updateEventStatus = function(status: string) {
    this.apiService.updateSingleEvent(this.eventId, status, (data) => {
      //console.log(data);
      console.log("Update status successful: new = " + status);
      this.ngOnInit();
    }, (err) => {
      console.log(err);
    });
  };

  public getEventStatus = function() {
    this.apiService.getSingleEvent(this.accountId, this.eventId, (data) => {
      console.log(data);
      if(data.status == undefined){
        data.status = "Not Started";
      }
      if(data.description == "booth"){
        data.description = "Booth Event";
        this.booth = true;
      } else{
        data.description = "Space Event";
        this.booth= false;
      }

      if(data.status == "Not Started"){
        this.inprogress = false;
        this.ended = false;
      } else if(data.status == "Completed"){
        this.inprogress = false;
        this.ended = true;
      }else if(data.status == "In-progress"){
        this.inprogress = true;
        this.ended = false;
      }

      data.eventDate = data.eventDate.substring(0,10);
      this.event = data;
    }, (err) => {
      console.log(err);
    });
  };

  public navigateHistoryPage = function(){
    console.log(this.router);
    this.router.navigate([this.eventId,'history']);

  }

  public navigateEventStatusPage = function(){
    this.router.navigate([this.eventId,'eventStatus']);
  }


}

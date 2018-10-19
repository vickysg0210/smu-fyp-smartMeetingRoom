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


  public pageName: String = 'home';
  public eventId: number;
  public dataSource: Array<any>;
  public eventStatus: string;
  public eventType: string;
  public accountId: number;
  public started: boolean;
  public inprogress: boolean;
  public ended: boolean;
  public booth: boolean = false;
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
      this.eventStatus = data.status;
      this.eventType = data.description;
      this.processEventStatus();
      console.log("Get status successful: current=" + this.eventStatus);
    }, (err) => {
      console.log(err);
    });
  };

  public navigateHistoryPage = function(){
    console.log(this.router);
    this.router.navigate([this.eventId,'history']);

  }

  public processEventStatus = function(){
    if(this.eventStatus == "Not Started"){
      this.inprogress = false;
      this.ended = false;
    } else if(this.eventStatus == "Completed"){
      this.inprogress = false;
      this.ended = true;
    }else if(this.eventStatus == "In-progress"){
      this.inprogress = true;
      this.ended = false;
    }

    if(this.eventType == "booth"){
      this.booth = true;
    }else{
      this.booth = false;
    }
  }

  // public disableDecision = function() {
  //   if (this.eventStatus === 'Not Started') {
  //     this.ifIsBefore = true;
  //     console.log("ifIsBefore = true");
  //   } else if (this.eventStatus === 'In-progress'){
  //     this.ifIsDuring = true;
  //     console.log("ifIsDuring = true");
  //   } else if (this.eventStatus === 'Ended'){
  //     this.ifIsAfter = true;
  //     console.log("ifIsAfter = true");
  //   } else {
  //     console.log("eventStatus=" + this.eventStatus);
  //   }
  // };


}

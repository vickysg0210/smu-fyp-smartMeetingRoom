import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DaoService } from '../../services/dao.service';

@Component({
  selector: 'app-add-event-page',
  templateUrl: './add-event-page.component.html',
  styleUrls: ['./add-event-page.component.scss']
})
export class AddEventPageComponent implements OnInit {

  public pageName: string;
  public event: {
    eventName: string,
    venue: string,
    eventaddress: string,
    city: string,
    country: string,
    postalCode: string,
    eventDate: string,
  };
  public accountId: number;

  constructor(public router: Router,
              private apiService: ApiService,
              private toastr: ToastrService,
              private daoService: DaoService
    ) {
    this.pageName = 'add-event-page';
    this.accountId = this.daoService.getAccount();
  }

  ngOnInit() {
    this.event = {
      eventName: "",
      venue: "",
      eventaddress: "",
      city: "",
      country: "",
      postalCode: "",
      eventDate: "",
    };
  }

  public addNewEvent = function(){
    this.apiService.createEvent(this.event.eventName, this.event.venue,"address","city","country","000000",this.event.eventDate, this.accountId,"Not Started", (data)=>{
      console.log(data);
      this.router.navigate(['/event-mgmt']);
    }, (err)=>{
      console.log(err);
      this.showErrorMessage()
    })
  }

  public showErrorMessage = function(){
    this.toastr.warning('This event can not created. Please try again.', 'Oops!',{
      timeOut: 3000,
      progressBar: true,
      positionClass: 'toast-bottom-center'
    });
  }

  public backToEventMgmt = function(){
    this.router.navigate(['/event-mgmt']);
  }

}

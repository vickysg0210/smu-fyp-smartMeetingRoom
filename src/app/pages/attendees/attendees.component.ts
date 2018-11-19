import { Component, OnInit, Directive, Input, ViewChild} from '@angular/core';
import { MatSidenav } from '@angular/material';
import { MatSort, MatPaginator, MatTableDataSource} from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { DaoService } from '../../services/dao.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-attendees',
  templateUrl: './attendees.component.html',
  styleUrls: ['./attendees.component.scss']
})
export class AttendeesComponent implements OnInit {
  @ViewChild('sidenav') sidenav: MatSidenav;
  // @ViewChild(MatPaginator) paginator: MatPaginator;
  // @ViewChild(MatSort) sort: MatSort;
  //present: boolean;
  public pageName: string = 'Attendees';
  displayedColumns = ['avatar', 'uuid', 'name', 'position', 'organization', 'actions'];
  // dataSource = new MatTableDataSource<PeriodicElement>(attendeeList);
  public eventId: number;
  public accountId: number;
  public attendeeList: Array<any>;
  public eventStatus: any;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private apiService : ApiService,
              private toastr: ToastrService,
              private daoService: DaoService) {
      this.route.params.subscribe((param)=>{
          this.eventId = param.id;
      });
      this.accountId = this.daoService.getAccount();
  }

  ngOnInit() {
    this.loadAttendees();
    this.getEventStatus();
    }

  public getEventStatus = function() {
    this.apiService.getSingleEvent(this.accountId, this.eventId, (data) => {
      console.log(data);
      this.eventStatus = data.status;
      console.log("Get status successful: current=" + this.eventStatus);
    }, (err) => {
      console.log(err);
    });
  };

  public loadAttendees = function(){
    this.apiService.getAttendees(this.eventId,(data)=>{
      console.log(data);
      this.attendeeList= data;
    }, (err)=>{
      console.log(err);
      this.toastr.showErrorMessage();
    })
  }

  public toggleNav = function(){
    this.sidenav.toggle();
  }

  public deleteAttendee = function(participantId: number){
    console.log(participantId);
    this.apiService.deleteAttendee(participantId, (data)=>{
      this.showSuccessMessage("");
      this.ngOnInit();
    },(err)=>{
      this.showErrorMessage();
    })
  }
  public showSuccessMessage = function(text : string){
    this.toastr.success(text, 'Successfully delete!',{
      timeOut: 4000,
      progressBar: true,
      positionClass: 'toast-bottom-center'
    })
  }
  public showErrorMessage = function(){
    this.toastr.warning('There is something wrong.', 'Oops!',{
      timeOut: 3000,
      progressBar: true,
      positionClass: 'toast-bottom-center'
    });
  }

}

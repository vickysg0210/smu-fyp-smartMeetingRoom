import { Component, OnInit, Directive, Input, ViewChild} from '@angular/core';
import { MatSidenav } from '@angular/material';
import { MatSort, MatPaginator, MatTableDataSource} from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
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
  public pageName: string = 'attendees';
  displayedColumns = ['avatar', 'uuid', 'name', 'position', 'organization', 'actions'];
  // dataSource = new MatTableDataSource<PeriodicElement>(attendeeList);
  public eventId: number;
  public attendeeList: Array<any>;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private apiService : ApiService,
              private toastr: ToastrService) {
      this.route.params.subscribe((param)=>{
          this.eventId = param.id;
      });
  }

  ngOnInit() {
    this.loadAttendees();
    }


  public loadAttendees = function(){
    this.apiService.getAttendees((data)=>{
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

  public deleteAttendee = function(participantName: string){
    console.log(participantName);
    this.apiService.deleteAttendee(participantName, (data)=>{
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
//
//
// export interface PeriodicElement {
//   avatar: string;
//   uuid: number;
//   name: string;
//   position: string;
//   organization: string;
//   isPresent: boolean;
// }
//
// const ELEMENT_DATA: PeriodicElement[] = [
//   {
//     avatar: 'http://www.worldcitiessummit.com.sg/sites/default/files/styles/people_listing_c_145_x_145_/public/gwb_peoples/michele.jpg?itok=SxgIGXvz',
//     uuid: 123,
//     name: 'MICHELE ACUTO',
//     position: 'Professor of Urban Politics',
//     organization: 'Melbourne School of Design',
//     isPresent: true
//   },{
//     avatar: 'http://www.worldcitiessummit.com.sg/sites/default/files/styles/people_listing_c_145_x_145_/public/gwb_peoples/michele.jpg?itok=SxgIGXvz',
//     uuid: 123,
//     name: 'Bernise Ang',
//     position: 'Principal and Methodology Lead',
//     organization: 'Zeroth Labs',
//     isPresent: false
//   },{
//     avatar: 'http://www.worldcitiessummit.com.sg/sites/default/files/styles/people_listing_c_145_x_145_/public/gwb_peoples/michele.jpg?itok=SxgIGXvz',
//     uuid: 123,
//     name: 'MICHELE ACUTO',
//     position: 'Professor of Urban Politics',
//     organization: 'Melbourne School of Design',
//     isPresent: true
//   },{
//     avatar: 'http://www.worldcitiessummit.com.sg/sites/default/files/styles/people_listing_c_145_x_145_/public/gwb_peoples/michele.jpg?itok=SxgIGXvz',
//     uuid: 123,
//     name: 'MICHELE ACUTO',
//     position: 'Professor of Urban Politics',
//     organization: 'Melbourne School of Design',
//     isPresent: true
//   }
// ];

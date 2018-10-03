import { Component, OnInit, EventEmitter } from '@angular/core';
import { UploadOutput, UploadInput, UploadFile, humanizeBytes, UploaderOptions } from 'ngx-uploader';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { ToastrService } from 'ngx-toastr';
import { DaoService } from '../../services/dao.service';
import { UploadFileService } from '../../services/upload-file.service';

@Component({
  selector: 'app-attendee-profile',
  templateUrl: './attendee-profile.component.html',
  styleUrls: ['./attendee-profile.component.scss']
})
export class AttendeeProfileComponent {
  public participant: {
      participantName: string,
      position: string,
      organization: string,
      uuid:string,
      major: string,
      minor: string,
      remark: string
    }
  public eventId: number;
  public pageName:String="";
  public accountId: number;
  public selectedFiles: FileList;
  public eventStatus: any;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private apiService: ApiService,
              private daoService: DaoService,
              private toastr: ToastrService,
              private uploadService: UploadFileService)
  {
    this.route.params.subscribe((param)=>{
        this.eventId = Number(param.id);
    });
    this.accountId = this.daoService.getAccount();
    this.participant = {
      participantName: "",
      position: "",
      organization: "",
      uuid:"",
      major: "",
      minor:"",
      remark: ""
    }
  }

  ngOnInit() {
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

  public createNewAttendee = function(){
    const file = this.selectedFiles.item(0);
    let url;
    this.uploadService.uploadfile(file)
    .then((data) => {
      console.log("success! data: ", data);
      url = data.Location;
      console.log("url!!!!", url);
      this.apiService.createParticipant(this.participant.participantName,
      this.eventId,
      this.participant.position,
      this.participant.organization,
      this.participant.uuid,
      this.participant.major,
      this.participant.minor,
      url,

      (data)=>{
      console.log("data!!!!!!!",data);
      this.router.navigate(['/',this.eventId,"attendees"]);
      this.showSuccessMessage("Created a new attendee");
      }, (err)=>{
        this.showErrorMessage()
      })
    },
    (err) => {
      console.log('There was an error uploading your file: ', err);
      url = "false";
    });
  }

  public selectFile = function(event: any) {
    this.selectedFiles = event.target.files;
  }

  public showSuccessMessage = function(text : string){
    this.toastr.success(text, 'Success!',{
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

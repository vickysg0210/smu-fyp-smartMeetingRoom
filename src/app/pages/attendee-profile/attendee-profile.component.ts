import { Component, EventEmitter } from '@angular/core';
import { UploadOutput, UploadInput, UploadFile, humanizeBytes, UploaderOptions } from 'ngx-uploader';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { ToastrService } from 'ngx-toastr';


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

  constructor(private route: ActivatedRoute,private router: Router,private apiService: ApiService,private toastr: ToastrService) {
    this.route.params.subscribe((param)=>{
        this.eventId = Number(param.id);
    });
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

  public createNewAttendee = function(){
    this.apiService.createParticipant(this.participant.participantName,
      this.eventId,
      this.participant.position,
      this.participant.organization,
      this.participant.uuid,
      this.participant.major,
      this.participant.minor,
      this.participant.remark,
      (data)=>{
      console.log(data);
      this.router.navigate(['/',this.eventId,"attendees"]);
      this.showSuccessMessage("Created a new attendee");
    }, (err)=>{
      this.showErrorMessage()
    })
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

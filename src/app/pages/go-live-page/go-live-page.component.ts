import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-go-live-page',
  templateUrl: './go-live-page.component.html',
  styleUrls: ['./go-live-page.component.scss']
})
export class GoLivePageComponent implements OnInit {

  public map: any;
  public mapId : number;
  public participants: Array<any>;
  private eventId: number;
  public presentList: Array<any>;
  public absentList: Array<any>;
  public windowWidth: number;
  public windowHeight: number;
  public tables: Array<{
    date: string,
    shape: string,
    tableId: number,
    radius: number,
    tableY: number,
    tableX: number,
    mac: string
  }>

  constructor(private route: ActivatedRoute,
              private router: Router,
              private apiService : ApiService,
              private toastr: ToastrService) {
    this.route.params.subscribe((param) => {
        this.eventId = param.id;
    });
    this.participants = [{
      name: "MICHELE ACUTO",
      position:"Professor of Urban Politics\n Melbourne School of Design",
      avatar: {
        url: "https://s3-ap-southeast-1.amazonaws.com/com.viatick/bms/medias/1530005406059micheleAcuto.jpeg"
      },
      coordinateX: 8,
      coordinateY: 9
    },{
      name: "Mulya Amri",
      position:"Program Director \n Jakarta Property Institute",
      avatar: {
        url: "https://media.licdn.com/dms/image/C5103AQEDnYtW0b8RWQ/profile-displayphoto-shrink_800_800/0?e=1535587200&v=beta&t=Q5xqp0qmqk2pvLkXNIIoLZvTzYY8ZREkAaJJn-IqZpk"
      },
      coordinateX: 4,
      coordinateY: 7
    }];

    this.presentList = [{
      participantId: 1,
      date: "2018",
      careerField: "Finance",
      position: "xyz",
      participantName: "Feng Timo",
      url: "https://s3-ap-southeast-1.amazonaws.com/com.viatick/bms/medias/1530005406059micheleAcuto.jpeg"
    },{
      participantId : 2,
      date: "2017",
      careerField: "IT",
      position: "xyz",
      participantName: "Fo Xi",
      url: "https://media.licdn.com/dms/image/C5103AQEDnYtW0b8RWQ/profile-displayphoto-shrink_800_800/0?e=1535587200&v=beta&t=Q5xqp0qmqk2pvLkXNIIoLZvTzYY8ZREkAaJJn-IqZpk"
    }];
    this.absentList = [{
      participantId: 3,
      date: "2018",
      careerField: "Finance",
      position: "xyz",
      participantName: "Feng Li",
      url: "https://s3-ap-southeast-1.amazonaws.com/com.viatick/bms/medias/1530005406059micheleAcuto.jpeg"
    },{
      participantId : 2,
      date: "2017",
      careerField: "IT",
      position: "xyz",
      participantName: "Yu Shan",
      url: "https://media.licdn.com/dms/image/C5103AQEDnYtW0b8RWQ/profile-displayphoto-shrink_800_800/0?e=1535587200&v=beta&t=Q5xqp0qmqk2pvLkXNIIoLZvTzYY8ZREkAaJJn-IqZpk"
    }];
    this.windowWidth = window.innerWidth;
    this.windowHeight = window.innerHeight;
    // this.mapId = 0;
  }

  ngOnInit() {
    this.getContainerMatrix();
    this.loadMap();
  }
  public loadMap = function(){
    this.apiService.getMapByEventId(this.eventId,(data)=>{
      console.log(data);
      this.mapId = data.mapId;
      console.log(this.mapId);
      console.log(data.width);
      this.map = data;
      this.mapName = data.mapName;
      console.log(this.map);
      this.loadTable();
    },(err)=>{
      this.showErrorMessage("failed to load map")
      }
    );
  }

  public loadTable = function(){
    this.apiService.getTablesByMapId(this.mapId,(data)=>{
      this.tables = data;
      console.log(this.tables)
    },(err)=>{
      this.showErrorMessage("error");
    }
  }

  public getContainerMatrix = function(){
    this.windowWidth = window.innerWidth;
    this.windowHeight = window.innerHeight;
  }
  public showSuccessMessage = function(text : string){
    this.toastr.success(text, 'Success!',{
      timeOut: 4000,
      progressBar: true,
      positionClass: 'toast-bottom-center'
    })
  }
  public showErrorMessage = function(text: string){
    this.toastr.warning(text, 'Oops!',{
      timeOut: 3000,
      progressBar: true,
      positionClass: 'toast-bottom-center'
    });
  }

}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-go-live-page',
  templateUrl: './go-live-page.component.html',
  styleUrls: ['./go-live-page.component.scss']
})
export class GoLivePageComponent implements OnInit {

  public map: any;
  public participants: Array<any>;
  private eventId: number;
  public presentList: Array<any>;
  public absentList: Array<any>;
  public windowWidth: number;
  public windowHeight: number;

  constructor(private route: ActivatedRoute) {
    this.route.params.subscribe((param) => {
        this.eventId = param.id;
    });
    this.map = {
      width : 12,
      height: 18,
      scale: 2
    };
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
  }

  ngOnInit() {
    // console.log(document.getElementById("map"));
    this.getContainerMatrix();
  }

  public getContainerMatrix = function(){
    this.windowWidth = window.innerWidth;
    this.windowHeight = window.innerHeight;
  }

}

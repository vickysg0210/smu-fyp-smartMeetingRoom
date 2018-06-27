import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-go-live-page',
  templateUrl: './go-live-page.component.html',
  styleUrls: ['./go-live-page.component.scss']
})
export class GoLivePageComponent implements OnInit {

  public map: any;
  public participants: Array<any>;
  constructor() {
    this.map = {
      width : 18,
      height: 12,
      scale: 2
    }
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
    }]
  }

  ngOnInit() {
  }

}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ApiService {
  private domain: string;
  constructor(private http: HttpClient) {
    this.domain="http://localhost:9999/smart_meeting_room/service/"
  }

  private login = function(email, password, success: any, error: any){
    this.http.post(this.domain+ "authentication", {
      email: email,
      password: password
    })
    .subscribe(
          data => {
            console.log(data);
              success(data);
          },
          err => {
            console.log(err);
              error(err);
          });
  }

  private getEvents = function(success: any, error: any){
    this.http.get(this.domain+"events/")
              .subscribe(
                data=>{
                  console.log(data);
                  success(data);
                },
                err =>{
                  console.log(err);
                  error(err);
                }
              )
  }

  private getMapByEventId = function(eventId: number,success: any,error: any){
    this.http.get(this.domain+"maps/"+eventId).subscribe(
      data=>{
        success(data);
      },
      err =>{
        error(err);
      }
    )
  }

  private getTablesByMapId = function(mapId:number,success: any, error: any){
    this.http.get(this.domain+"readers/"+mapId).subscribe(
      data=>{
        success(data);
      },
      err =>{
        error(err);
      }
    )
  }

  private register = function(email, password, accountName, phone){
    this.http.post(this.domain+ "accounts", {
      email: email,
      password: password,
      accountName: accountName,
      phone :phone
    }).subscribe(
      data => {
          return data;
      },
      err => {
          return err;
      });
  }

  private createTable = function(mapId,mac,tableX,tableY,success: any,error: any){
    this.http.post(this.domain+"readers",{
      mapId: mapId,
      mac: mac,
      tableX: tableX,
      tableY: tableY
    }).subscribe(data=>{success(data);});
  }

  private updateTable = function(tableId,mac,tableX,tableY,success:any,error:any){
    this.http.put(this.domain+"readers/"+tableId,{
      mac: mac,
      tableX: tableX,
      tableY: tableY
    }).subscribe(
      data=>{
        success(data);
      }
    );
  }

  private updateMap = function(mapId,width,height,scale,success: any,error: any){
    this.http.put(this.domain+"maps/"+mapId, {
      width: width,
      height: height,
      scale: scale
    }).subscribe(data=>{success(data);},err=>{error(err);});
  }

  private getAttendees = function(success: any, error: any){
    this.http.get(this.domain+ "participants")
              .subscribe(
                data=>{
                  console.log(data);
                  success(data);
                },
                err =>{
                  console.log(err);
                  error(err);
                }
              )
  }

  private deleteAttendee = function(participantName, success: any,error: any){
    this.http.delete(this.domain+"participants/"+participantName)
            .subscribe(data=>{
              success(data);
            },err =>{
              error(err);
            })
  }

  private deleteTable = function(tableId,success: any,error: any){
    this.http.delete(this.domain+"readers/"+tableId)
    .subscribe(data=>{success(data);},err=>{error(err)};)
  }

  private createParticipant = function(participantName,eventId,position,organization,uuid,major,minor,remark,
  success: any, error: any){
    this.http.post(this.domain+"participants",{
      participantName:participantName,
      eventId:eventId,
      position:position,
      organization:organization,
      uuid:uuid,
      major:major,
      minor:minor,
      remark:remark
    }).subscribe(data=>{
      console.log(data);
      success(data);
    },err =>{
      error(err);
    })
  }

}

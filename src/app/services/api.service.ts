import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ApiService {
  private domain: string;
  constructor(private http: HttpClient) {
    // this.domain="http://35.198.253.204/fyp-MRS/service/"
    // http://35.240.227.116:8080
    this.domain="http://localhost:9999/smart_meeting_room/service/"
    // this.domain="/smart_meeting_room/service/"
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

  private getEvents = function(accountId: number, success: any, error: any){
    this.http.get(this.domain+"events/"+ accountId)
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

  private getSingleEvent = function(accountId: number, eventId: number, success: any, error: any){
    this.http.get(this.domain+"events/"+ accountId + "/" + eventId).subscribe(
                data=>{
                  success(data);
                },
                err =>{
                  error(err);
                }
              )
  }

  private updateSingleEvent = function(eventId: number, status: string, success: any, error: any){
    this.http.put(this.domain+"events/"+ eventId, {
      status: status
    }).subscribe(
                data=>{
                  success(data);
                },
                err =>{
                  error(err);
                }
              )
  }

  private getSchedules = function(eventId: number, success: any, error: any){
    this.http.get(this.domain+"schedules/"+ eventId).subscribe(
                data=>{
                  success(data);
                },
                err =>{
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

  private createEvent = function(eventName,venue,eventaddress,city,country,postalCode,eventDate,accountId,status,success: any,error: any){
    this.http.post(this.domain+"events",{
      eventName: eventName,
      venue: venue,
      eventaddress: eventaddress,
      city: city,
      country: country,
      postalCode: postalCode,
      eventDate: eventDate,
      accountId: accountId,
      status: status
    }).subscribe(data=>{success(data);},err =>{return err;});
  }

  private createSchedule = function (eventId:number, startTime, endTime, description, success: any, error: any){
    this.http.post(this.domain + "schedules/", {
      eventId: eventId,
      startTime: startTime,
      endTime: endTime,
      description: description
    }).subscribe(data=>{success(data);},err =>{error(err);});
  }

  private deleteEvent = function(eventId: number, success: any, error: any) {
    this.http.delete(this.domain+"events/"+ eventId)
            .subscribe(data=>{
              success(data);
            },err =>{
              error(err);
            })
  }

  private deleteSchedule = function(scheduleId: number, success: any, error: any) {
    this.http.delete(this.domain+"schedules/"+ scheduleId)
            .subscribe(data=>{
              success(data);
            },err =>{
              error(err);
            })
  }

  private getTablesByMapId = function(mapId:number,success: any, error: any){
    this.http.get(this.domain+"readers/"+mapId).subscribe(
      data=>{
        success(data);
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

  private getAttendees = function(eventId,success: any, error: any){
    this.http.get(this.domain+ "participants/"+eventId)
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


  private deleteAttendee = function(participantId, success: any,error: any){
    this.http.delete(this.domain+"participants/"+participantId)
            .subscribe(data=>{
              success(data);
            },err =>{
              error(err);
            })
  }

  private deleteTable = function(tableId,success: any,error: any){
    this.http.delete(this.domain+"readers/"+tableId)
    .subscribe(data=>{success(data);},err=>{error(err);})
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

  private getAllParticipants = function(eventId,success: any, error: any){
    this.http.get(this.domain+"participants/"+eventId).subscribe(data=>{
      success(data);
    },err=>{
      error(err);
    })
  }

  private getTrackings = function(mapId,trackingTime,success :any, error: any){
    this.http.get(this.domain+"trackings/"+mapId+"/"+trackingTime).subscribe(data=>{
      // console.log("####",data);
      success(data);
    },err=>{
      error(err);
    })
  }

  private getAnalysisDemogra = function(eventId:number,success :any, error: any){
    this.http.get(this.domain+"analysis/demo/"+eventId).subscribe(data=>{
      // console.log("####",data);
      success(data);
    },err=>{
      error(err);
    })
  }

  private getAnalysisAtte = function(eventId: number,success: any,error: any){
    this.http.get(this.domain+"analysis/atte/"+eventId).subscribe(data=>{
      success(data);
    },err=>{
      error(err);
    })
  }

  private getAnalysisHeat = function(eventId, scheduleId, success: any, error: any){
    this.http.get(this.domain+"analysis/heat/"+eventId+"/"+scheduleId).subscribe(data=>{
      success(data);
    },err=>{
      error(err);
    })
  }


  private getHistoryTrackings = function(trackingTime,success :any, error: any){
    this.http.get(this.domain+"trackings/history/"+trackingTime).subscribe(data=>{
      success(data);
    }, err=>{
      error(err);
    })
  }

}

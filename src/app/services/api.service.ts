import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ApiService {

  constructor(private http: HttpClient) { }

  private login = function(email, password, success: any, error: any){
    this.http.post("http://localhost:9999/smart_meeting_room/service/authentication", {
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
    this.http.get("http://localhost:9999/smart_meeting_room/service/events/")
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

  private register = function(email, password, accountName, phone){
    this.http.post("http://localhost:9999/smart_meeting_room/service/accounts", {
      email: email,
      password: password,
      accountName: accountName,
      phone :phone
    }).subscribe(
      data => {
          // console.log(data);
          return data;
      },
      err => {
          // console.log(err);
          return err;
      });
  }

}

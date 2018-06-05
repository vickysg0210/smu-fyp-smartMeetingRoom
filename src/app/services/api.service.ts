import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ApiService {

  constructor(private http: HttpClient) { }

  private login = function(email, password){
    this.http.post("http://localhost:9999/smart_meeting_room/service/authentication", {
      email: email,
      password: password
    }).subscribe(
          data => {
              return data;
          },
          err => {
              return err;
          });
  }

  private register = function(email, password, accountName, phone){
    this.http.post("http://localhost:9999/smart_meeting_room/service/accounts", {
      email: email,
      password: password,
      accountName: accountName,
      phone :phone
    }).subscribe(
      data => {
          console.log(data);
          return data;
      },
      err => {
          console.log(err);
          return err;
      });
  }

  //header: put auth secret in header

}

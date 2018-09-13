import { Injectable } from '@angular/core';

import { Account } from '../interfaces/account';

@Injectable({
  providedIn: 'root'
})
export class DaoService {

  private keys ={
    ACCOUNT : "SMR_ACCOUNT",
    AUTH_SECRET: "SMR_AUTH_SECRET",
    EVENTID:"SMR_EVENT"
  }
  constructor() { }

  private storeAccount = function(account: Account) {
    console.log(account);
    localStorage.setItem(this.keys.ACCOUNT, JSON.stringify(account));
  };

  public storeEvent = function(eventId: number){
    localStorage.setItem(this.keys.EVENTID, eventId.toString());
  }


  public getAccount = function(){
    let account: Account = JSON.parse(localStorage.getItem(this.keys.ACCOUNT));
    // console.log(account);
    if(account){
      return account.accountId;
    }else {
      return -1;
    }
  }

  public getEvent = function(){
    let eventId = localStorage.getItem(this.keys.EVENTID);

    if(eventId){
      return parseInt(eventId);
    }else{
      return -1;
    }
  }
}

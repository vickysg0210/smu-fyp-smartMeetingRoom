import { Injectable } from '@angular/core';

import { Account } from '../interfaces/account';

@Injectable({
  providedIn: 'root'
})
export class DaoService {

  private keys ={
    ACCOUNT : "SMR_ACCOUNT",
    AUTH_SECRET: "SMR_AUTH_SECRET"
  }
  constructor() { }

  private storeAccount = function(account: Account) {
    localStorage.setItem(this.keys.ACCOUNT, JSON.stringify(account));
  };

  private setSecret = function(secret: string) {
    localStorage.setItem(this.keys.AUTH_SECRET, secret);
  };

  private getSecret = function() {
    return localStorage.getItem(this.keys.AUTH_SECRET);
  };
}

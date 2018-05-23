import { Injectable } from '@angular/core';
import { Router } from '@angular/router';


@Injectable()
export class AuthService {
    private isUserLoggedIn: boolean;
    private username;

    constructor(private router: Router) {
        this.isUserLoggedIn = false;
    }

    private setUserLoggedIn = function(){
        this.isUserLoggedIn = true;
    }

    public getUserLoggedIn = function(): boolean{
        return this.isUserLoggedIn;
    }

    private login = function(email, password){
      //this.api.login(this.email, this.password);
      //temp testing code:
      if (email == "admin"){
          localStorage.setItem('email', email);
          this.setUserLoggedIn();
          this.router.navigate(['event-mgmt']);
      }else{
          return false;
      }
    }

    private register = function(email, password){
      //this.api.register(this.email, this.password);
      localStorage.setItem('email', email);
      this.setUserLoggedIn();
      // console.log("register setUserLoggedIn: ", this.getUserLoggedIn());
      this.router.navigate(['register-buffer']);
    }

}

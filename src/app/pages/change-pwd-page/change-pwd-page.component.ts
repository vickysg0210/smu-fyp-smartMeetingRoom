import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-change-pwd-page',
  templateUrl: './change-pwd-page.component.html',
  styleUrls: ['./change-pwd-page.component.scss']
})
export class ChangePwdPageComponent implements OnInit {

  public account: {
    email: string,
    username: string,
    password: string,
    cfmPassword: string
  };

  private oldPassword: string;

  constructor() {
    this.account = {
      email: "",
      username: "",
      password: "",
      cfmPassword: ""
    };
    this.oldPassword = "";
  }

  ngOnInit() {

  }

  public changePwd = function(){
    if(this.account.email == "admin@email.com" && this.account.password == "pwd1pwd1"){
      // this.daoService.storeAccount(this.account);
      // this.daoService.setSecret(this.secret);
      this.router.navigate(['/event-mgmt']);
    }
    else {
      this.showErrorMessage();
    }
  }

}

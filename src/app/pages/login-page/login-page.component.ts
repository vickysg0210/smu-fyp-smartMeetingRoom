import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { DaoService } from '../../services/dao.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
    public account: {
      email: string,
      password: string
    };

    public secret: string;
    /* Form Validators */
    // private PWD_REGEX = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{8,}$/;
    public formControl: {
      email: FormControl,
      password: FormControl
    } = {
      email: new FormControl('', [
        Validators.required,
        Validators.email
      ]),
      password: new FormControl('', [
        Validators.required
        // Validators.pattern(this.PWD_REGEX)
      ])
    };
    /* End of Validators */
    constructor(public router: Router,
                private toastr: ToastrService) {
        this.account = {
        email: "",
        password: ""
      };
    }
    ngOnInit() {
      // this.checkLogin();
    }
    public login = function(){
      if(this.account.email == "admin@email.com" && this.account.password == "pwd1pwd1"){
        // this.daoService.storeAccount(this.account);
        // this.daoService.setSecret(this.secret);
        this.router.navigate(['/event-mgmt']);
      }
      else {
        this.showErrorMessage();
      }
    }

    public showErrorMessage = function(){
      this.toastr.warning('This account is not recognized. Please try again.', 'Oops!',{
        timeOut: 3000,
        progressBar: true,
        positionClass: 'toast-bottom-center'
      });
    }

    private checkLogin = function() {
      let secret = this.daoService.getSecret();
      // console.log(secret);
      if(secret) {
        this.router.navigate(['event-mgmt']);
      }
    };
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';
import {NgForm} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
    // public errorMsg: string;
    public account: {
      email: string,
      password: string
    };
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
    }

    public login = function(){
      if(this.account.email == "admin@email.com" && this.account.password == "pwd1pwd1"){
        this.router.navigate(['event-mgmt']);
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

    // public auth = function(f: NgForm){
    //     console.log(f.value.username, f.value.password);
    //     this.email = f.value.email;
    //     this.password = f.value.password
    //     var logginIn = this.user.login(this.email, this.password);
    //     if (!logginIn){
    //         this.errorMsg = 'Failed to login! try again ...';
    //     }
    // }



}

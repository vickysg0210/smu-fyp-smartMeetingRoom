import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss']
})
export class RegisterPageComponent implements OnInit {
    public account: {
      email: string,
      username: string,
      password: string,
      cfmPassword: string
    };
    public formControl: {
      email: FormControl,
      password: FormControl,
      username: FormControl,
      // cfmPassword : FormControl
    } = {
      email: new FormControl('', [
        Validators.required,
        Validators.email
      ]),
      password: new FormControl('', [
        Validators.required
        // Validators.pattern(this.PWD_REGEX)
      ]),
      username: new FormControl('',[
        Validators.required
      ]),
      // cfmPassword : new FormControl('',[
      //   Validators.required
      // ])
    };

    constructor(public router: Router,
                private toastr: ToastrService,
                private apiService : ApiService) {
        this.account = {
          email: "",
          username: "",
          password: "",
          cfmPassword: ""
        };
    }

    ngOnInit() {
    }

    public register = function(){
      console.log("anything here");
      if(this.account.password != this.account.cfmPassword) {
        console.log("pwd not equal to cfmPwd");
        this.showErrorMessage();
      }else {
        this.showSuccessMessage("Account created successfully");
        console.log("before api");
        this.apiService.register(this.account.email,this.account.password,this.account.username,"phone");
        console.log("after api");
        this.router.navigate(['/login']);
      }
    }

    public showSuccessMessage = function(text : string){
      this.toastr.success(text, 'Congratulations!',{
        timeOut: 4000,
        progressBar: true,
        positionClass: 'toast-bottom-center'
      })
    }
    public showErrorMessage = function(){
      this.toastr.warning('Please confirm your password.', 'Oops!',{
        timeOut: 3000,
        progressBar: true,
        positionClass: 'toast-bottom-center'
      });
    }

}

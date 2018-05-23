import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss']
})
export class RegisterPageComponent implements OnInit {
    public email: string;
    public password: string;
    public errorMsg: string;

    constructor(private user: AuthService) {
        this.email = "";
        this.password = "";
    }

    ngOnInit() {
    }

    public register = function(f: NgForm){
        console.log(f.value.username, f.value.password);
        this.email = f.value.email;
        this.password = f.value.password;
        var cfmPassword = f.value.cfmPassword;
        if (cfmPassword != this.password){
            this.errorMsg = "Confirm password must match password";
        }else{
            this.user.register(this.email, this.password);
        }
    }

}

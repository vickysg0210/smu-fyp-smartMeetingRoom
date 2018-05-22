import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
    public email: string;
    public password: string;
    public errorMsg: string;

    constructor(private router: Router, private user: AuthService) {
        this.email = "";
        this.password = "";
    }

    ngOnInit() {
    }

    public auth = function(f: NgForm){
        console.log(f.value.username, f.value.password);
        this.email = f.value.email;
        this.password = f.value.password
        var logginIn = this.user.login(this.email, this.password);
        if (!logginIn){
            this.errorMsg = 'Failed to login! try again ...';
        }
    }

}

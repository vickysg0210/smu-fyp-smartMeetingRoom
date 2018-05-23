import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-register-buffer-page',
  templateUrl: './register-buffer-page.component.html',
  styleUrls: ['./register-buffer-page.component.scss']
})
export class RegisterBufferPageComponent implements OnInit {
    public count: number;

    constructor(private router: Router, private user: AuthService) {
        this.count = 5;
     }

    ngOnInit() {
        setTimeout(()=>{this.count = 4;}, 2000);
        setTimeout(()=>{this.count = 3;}, 3000);
        setTimeout(()=>{this.count = 2;}, 4000);
        setTimeout(()=>{this.count = 1;}, 5000);
        setTimeout(()=>{
            this.count = 0;
            this.router.navigate(['event-mgmt']);
        }, 6000);
    // setTimeout(function() {
    //     this.count 
    //   console.log("timeout!!", 4);
    // }, 2000)
    // setTimeout(function() {
    //   console.log("timeout!!", 3);
    // }, 3000)
    // setTimeout(function() {
    //   console.log("timeout!!", 2);
    // }, 4000)
    // setTimeout(function() {
    //   console.log("timeout!!", 1);
    // }, 5000)
    // setTimeout(()=>{
    //   console.log("timeout!!", 0, " ", this.user.getUserLoggedIn());
    //   // this.router.navigate(['event-mgmt']);
    // }, 6000)

    }

}

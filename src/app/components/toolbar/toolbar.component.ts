import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ViewService } from '../../services/view.service';


@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
  providers: [ViewService]
})
export class ToolbarComponent implements OnInit {
    // isLoggedIn$: Observable<boolean>;
    public isLoggedIn: boolean = false;
    public page: string;

    constructor(private user: AuthService, private router: Router, private viewService: ViewService) {}

    ngOnInit() {
      this.isLoggedIn = this.user.getUserLoggedIn();
      console.log("toolbar isloggedin: ", this.isLoggedIn);
      // console.log(this.router.url, "!!router");

        // this.isLoggedIn$ = this.authService.isLoggedIn;
        // this.isLoggedIn$.subscribe((isLoggedin) => {
        // if(!isLoggedin){
        //     this.router.navigate(['/login']);
        // }
        // });
    }


}

import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
    // isLoggedIn$: Observable<boolean>;
    public isLoggedIn: boolean = false;

    constructor(private user: AuthService) { }

    ngOnInit() {
      this.isLoggedIn = this.user.getUserLoggedIn();

        // this.isLoggedIn$ = this.authService.isLoggedIn;
        // this.isLoggedIn$.subscribe((isLoggedin) => {
        // if(!isLoggedin){
        //     this.router.navigate(['/login']);
        // }
        // });
    }

}

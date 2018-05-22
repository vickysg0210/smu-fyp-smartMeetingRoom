import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';


@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
    // isLoggedIn$: Observable<boolean>;
    public isLoggedIn: boolean = true;

    constructor() { }

    ngOnInit() {
        // this.isLoggedIn$ = this.authService.isLoggedIn;
        // this.isLoggedIn$.subscribe((isLoggedin) => {
        // if(!isLoggedin){
        //     this.router.navigate(['/login']);
        // }
        // });
    }

}

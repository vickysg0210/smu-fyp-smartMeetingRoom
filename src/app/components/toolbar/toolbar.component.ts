import { Component, OnInit } from '@angular/core';
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
    public view_icon: string;
    public view_name: string;

    constructor(private user: AuthService, private router: Router, private viewService: ViewService) {
      this.view_icon = 'view_list';
      this.view_name = 'List View';
      router.events.subscribe((res)=>{
        this.page = this.router.url;
        console.log(this.page == '/event-mgmt', "!!router");
      })
    }

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

    public changeView = function(){
      console.log("changeview called!!!");
      //change to list/grid view;
      if (this.view_icon == "view_list"){
        this.viewService.toList();
        this.view_icon = 'view_module';
        this.view_name = 'Grid View';
      }else{
        this.viewService.toGrid();
        this.view_icon = 'view_list';
        this.view_name = 'List View';
      }
    }

}

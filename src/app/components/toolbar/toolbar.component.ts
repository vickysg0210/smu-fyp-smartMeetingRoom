import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
    @Output() viewChange = new EventEmitter<string>();

    public viewIcon: string = "view_module";
    public isLoggedIn: boolean = false;
    public searchEventText: string = "";

    constructor(private user: AuthService, private router: Router) {}

    ngOnInit() {
      this.isLoggedIn = this.user.getUserLoggedIn();
      console.log("toolbar isloggedin: ", this.isLoggedIn);
    }
    public changeView = function(){
      if(this.viewIcon == "view_list"){
        this.viewIcon = "view_module";
      }else {
        this.viewIcon = "view_list"
      }
      this.viewChange.emit(this.viewIcon);
    }

}

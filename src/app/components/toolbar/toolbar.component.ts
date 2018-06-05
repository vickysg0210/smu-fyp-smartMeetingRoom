import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
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
    @Input() pageName: string;

    public viewIcon: string = "view_module";
    public searchEventText: string = "";
    public navbarIconShow : boolean = false;

    constructor(private user: AuthService, private router: Router) {}

    ngOnInit() {
      this.checkPageName()
    }
    public changeView = function(){
      if(this.viewIcon == "view_list"){
        this.viewIcon = "view_module";
      }else {
        this.viewIcon = "view_list"
      }
      this.viewChange.emit(this.viewIcon);
    }

    public checkPageName = function(){
      if (this.pageName == "eventMgmt"){
        this.navbarIconShow = true;
      }
    }

}

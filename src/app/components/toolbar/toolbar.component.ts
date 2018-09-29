import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { DaoService } from '../../services/dao.service';


@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
  //  @Output() viewChange = new EventEmitter<string>();
  //  @Output() navbarToggle = new EventEmitter<string>();
    @Input() eventStatus: string;
    public eventId: number;

    constructor(private user: AuthService,
                private route: ActivatedRoute,
                private router: Router,
                private apiService: ApiService,
                private daoService: DaoService) {
      this.route.params.subscribe((param) => {
          this.eventId = +param.id;
      });
    }

    ngOnInit() {}


}

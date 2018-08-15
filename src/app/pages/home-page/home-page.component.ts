import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {


  public pageName: String = 'home';
  public eventId: number;

  constructor(private route: ActivatedRoute) {
      this.route.params.subscribe((param)=>{
          this.eventId = param.id;
      });
  }

  ngOnInit() {
  }

  public showSubContent = function(item: string){

  }

}

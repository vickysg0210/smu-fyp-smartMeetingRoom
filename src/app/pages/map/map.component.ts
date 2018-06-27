import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  public pageName: string = 'map';
  private eventId: number;

  constructor(private route: ActivatedRoute) {
      this.route.params.subscribe((param) => {
          this.eventId = param.id;
      });
  }

  ngOnInit() {
  }

}

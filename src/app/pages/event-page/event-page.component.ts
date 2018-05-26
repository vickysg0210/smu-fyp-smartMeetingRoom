import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-event-page',
  templateUrl: './event-page.component.html',
  styleUrls: ['./event-page.component.scss']
})
export class EventPageComponent implements OnInit {
    private id: number;

    constructor(private route: ActivatedRoute) {
        this.route.params.subscribe((param)=>{
            this.id = param.id;
        });
    }

    ngOnInit() {
    }

}

import { Component } from '@angular/core';
import { ViewService } from './services/view.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'app';

    constructor(private viewService: ViewService) {
        viewService.isGridView$.subscribe(isGrid=>{
            console.log("subscribe called with isGrid: ",isGrid);
            // this.isGridView = isGrid;
        });
    }
}

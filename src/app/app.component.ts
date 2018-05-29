import { Component, ViewChild } from '@angular/core';
import { ViewService } from './services/view.service';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'app';
    //isGridView: boolean;
    //@ViewChild(ToolbarComponent)
    //set toolbar(child: ToolbarComponent){
    //    this.isGridView = child.isGrid;
    //}

    constructor(private viewService: ViewService) {
        // viewService.isGridView$.subscribe(isGrid=>{
        //     console.log("subscribe called with isGrid: ",isGrid);
        //     // this.isGridView = isGrid;
        // });
    }

    onSwitch(isGrid: boolean){
    }

    //ngAfterViewInit() {
    //    console.log("app.component isGrid = ", this.isGridView);
    //}
}

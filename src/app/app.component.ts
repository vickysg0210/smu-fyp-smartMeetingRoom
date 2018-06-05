import { Component, ViewChild } from '@angular/core';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'app';
    constructor() {
    }
    onSwitch(isGrid: boolean){
    }
}

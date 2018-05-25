import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs';

@Injectable()
export class ViewService {
    private isGridViewSrource = new Subject<boolean>();

    isGridView$ = this.isGridViewSrource.asObservable();

    constructor() { }

    public toGrid = function(){
        this.isGridViewSrource.next(true);
    }

    public toList = function(){
        this.isGridViewSrource.next(false);
        console.log("viewservice toList called");
    }

}

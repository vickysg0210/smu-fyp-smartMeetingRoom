import { Component, OnInit} from '@angular/core';
import * as d3 from "d3";
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { ToastrService } from 'ngx-toastr';
// import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
// import {MapDialogComponent} from '../components/map-dialog'


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  public pageName: string = 'map';
  private eventId: number;
  public mapId: number;

  public mapName : string;
  public mapExistence: boolean = false;
  public map: any;
  public scaleOptions: Array<number>;
  public windowWidth: number;
  public windowHeight: number;
  public participants: Array<any>;
  public tables: Array<{
    date: string,
    shape: string,
    tableId: number,
    radius: number,
    tableY: number,
    tableX: number,
    mac: string
  }>
  constructor(private route: ActivatedRoute,
              private router: Router,
              private apiService : ApiService,
              private toastr: ToastrService) {
    this.route.params.subscribe((param) => {
        this.eventId = param.id;
    });
    this.scaleOptions=[1,2,5]
    this.participants=[];
    this.map = {
      width :0,
      height:0,
      scale:0
    }
    this.windowWidth = window.innerWidth;
    this.windowHeight = window.innerHeight+100;
  }

  ngOnInit(){
    this.loadMap();
  }

  public loadMap = function(){
    this.apiService.getMapByEventId(this.eventId,(data)=>{
      // console.log(data);
      this.mapId = data.mapId;
      this.map.width=data.width;
      this.map.height=data.height;
      this.map.scale=Number(data.scale);
      this.mapName = data.mapName;
      this.loadTable();
    },(err)=>{
      this.showErrorMessage("There is something wrong to load the map.");
    })
  }

  public loadTable = function(){
    this.apiService.getTablesByMapId(this.mapId,(data)=>{
      this.tables = data;
    }),(err)=>{
      this.showErrorMessage("Failed to load tables")
    }
  }

    public addTable = function(){
      this.tables.push({
        date: "",
        shape: "",
        tableId: 0,
        radius: 0,
        tableY: 0,
        tableX: 0,
        mac: ""
      })
    }

  public removeTable = function(index: number){
    console.log(index);
    let tableId = this.tables[index].tableId;
    this.apiService.deleteTable(tableId,(data)=>{
      this.showSuccessMessage("Deleted Table");
    }),(err)=>{
      this.showErrorMessage("Failed to delete table")
    }
    this.tables.splice(index,1);
    console.log(this.tables);
  }

  public saveMap = function(){
    this.apiService.updateMap(this.mapId,this.map.width.toString(),this.map.height.toString(),this.map.scale.toString(),(data)=>{
      this.showSuccessMessage("Updated Map");
    }),(err)=>{
      this.showErrorMessage("failed to update map");
    }
    for(let table of this.tables){
      console.log(table);
      if(table.tableId === 0){
        this.apiService.createTable(this.mapId,table.mac,Number(table.tableX),Number(table.tableY),(data)=>{
          this.showErrorMessage("Created Table" +table.tableId);
        }),(err)=>{
          this.showErrorMessage("Failed to create table")
        }
      }else {
        this.apiService.updateTable(table.tableId,table.mac,Number(table.tableX),Number(table.tableY),(data)=>{
          this.showSuccessMessage("Updated Table");
        })
      }
    }

  }

  public showSuccessMessage = function(text : string){
    this.toastr.success(text, 'Success!',{
      timeOut: 4000,
      progressBar: true,
      positionClass: 'toast-bottom-center'
    })
  }
  public showErrorMessage = function(text: string){
    this.toastr.warning(text, 'Oops!',{
      timeOut: 3000,
      progressBar: true,
      positionClass: 'toast-bottom-center'
    });
  }
}

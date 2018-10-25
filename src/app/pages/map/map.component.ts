import { Component, OnInit} from '@angular/core';
import * as d3 from "d3";
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { DaoService } from '../../services/dao.service';
import { ToastrService } from 'ngx-toastr';
import { UploadOutput, UploadInput, UploadFile, humanizeBytes, UploaderOptions } from 'ngx-uploader';
import { UploadFileService } from '../../services/upload-file.service';
import { HostListener } from '@angular/core'
import { DomSanitizer } from '@angular/platform-browser';

// import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
// import {MapDialogComponent} from '../components/map-dialog'


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  public pageName: string = 'map';
  public eventId: number;
  public accountId: number;
  public mapId: number;
  public mapName : string;
  // public mapExistence: boolean = false;
  public ratio: number;
  public map: any;
  public windowWidth: number;
  public windowHeight: number;
  public participants: Array<any>;
  public selectedFiles: FileList;
  public tables: Array<{
    date: string,
    shape: string,
    tableId: number,
    radius: number,
    tableY: number,
    tableX: number,
    mac: string
  }>
  public eventStatus: any;

  @HostListener('window:resize', ['$event']) onResize(event) {
      this.windowWidth = window.innerWidth;
      this.windowHeight = window.innerHeight+100;
      console.log(this.windowWidth);
      console.log(this.windowHeight);
    }

  constructor(private route: ActivatedRoute,
              private router: Router,
              private apiService : ApiService,
              private daoService: DaoService,
              private toastr: ToastrService,
              private uploadService: UploadFileService,
              private sanitizer: DomSanitizer) {
    this.route.params.subscribe((param) => {
        this.eventId = param.id;
    });
    this.accountId = this.daoService.getAccount();
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
    this.getEventStatus();
  }

  public getEventStatus = function() {
    this.apiService.getSingleEvent(this.accountId, this.eventId, (data) => {
      console.log(data);
      this.eventStatus = data.status;
      console.log("Get status successful: current=" + this.eventStatus);
    }, (err) => {
      console.log(err);
    });
  };

  public loadMap = function(){
    this.apiService.getMapByEventId(this.eventId,(data)=>{
      // console.log(data);
      this.mapId = data.mapId;
      this.map.width=data.width;
      this.map.height=data.height;
      this.map.scale=data.scale;
      this.mapName = data.mapName;
      console.log(this.map);
      this.processRatio();
      this.loadTable();
    },(err)=>{
      console.log(err);
      this.showErrorMessage("There is something wrong to load the map.");
    })
  }

  public processRatio = function(){
    this.ratio = Math.min(this.windowWidth/5*4 / this.map.width, this.windowHeight/3*2 /this.map.height)/5*2;
    console.log(this.ratio);
  }

  public loadTable = function(){
    //the back end handles the new map
    this.apiService.getTablesByMapId(this.mapId,(data)=>{
      this.tables = data;
      console.log(this.tables);
    }),(err)=>{
      this.showErrorMessage("Failed to load tables")
      this.tables=[];
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
    const file  = this.selectedFiles.item(0);
    let url;
    this.uploadService.uploadfile(file)
    .then((data)=>{
      console.log("upload data", data);
      url = data.Location;
      this.apiService.updateMap(this.mapId,this.map.width.toString(),this.map.height.toString(),url,(data)=>{
        console.log("map",data);
        this.showSuccessMessage("Updated Map");
        this.loadMap();

      }),(err)=>{
        this.showErrorMessage("failed to update map");
      };
      // console.log("url",this.url);
      // this.loadMap();
    },(err)=>{
      console.log("There was an error uploading your file", err);
      url="false";
    });
    // this.loadMap();
  }

  public saveReader = function(){
    for(let table of this.tables){
      console.log(table);
      if(table.tableId === 0){
        this.apiService.createTable(this.mapId,table.mac,table.tableX,table.tableY,(data)=>{
          console.log(table);
          this.showSuccessMessage("Created Table " +table.tableId);
        }),(err)=>{
          console.log(table);
          this.showErrorMessage("Failed to create table")
        }
      }else {
        this.apiService.updateTable(table.tableId,table.mac,table.tableX,table.tableY,(data)=>{
          this.showSuccessMessage("Updated Table");
        })
      }
    }
    this.loadTable();
  }

  public selectFile = function(event: any){
    this.selectedFiles = event.target.files;
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

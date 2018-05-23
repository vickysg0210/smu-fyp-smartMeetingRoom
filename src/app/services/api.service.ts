import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ApiService {

  constructor(private http: HttpClient) { }

  private getAssets = function(id){
      this.http.get("http://localhost:8080/asset_mgmt/service/assets/" + id).subscribe(
          data => {
              console.log(data);
          },
          err => {
              console.log(err);
          });
  }

    private getAsset = function(){
      this.http.get("http://localhost:8080/asset_mgmt/service/assets").subscribe(
          data => {
              console.log(data);
          },
          err => {
              console.log(err);
          });
  }

  private login = function(email, password){
    this.http.post("http://localhost:8080/asset_mgmt/service/authentication", {
      email: email,
      password: password
    }).subscribe(
          data => {
              console.log(data);
          },
          err => {
              console.log(err);
          });
  }

  private register = function(email, password){
    this.http.post("http://localhost:8080/asset_mgmt/service/accounts", {
      email: email,
      password: password
    }).subscribe(
          data => {
              console.log(data);
          },
          err => {
              console.log(err);
          });
  }

  //header: put auth secret in header

  //create account: post, "http://localhost:8080/asset_mgmt/service/accounts", type (account type), email, password
  //get asset: http://localhost:8080/asset_mgmt/service/assets/id
  //get assets: http://localhost:8080/asset_mgmt/service/assets
  //post get assets: http://localhost:8080/asset_mgmt/service/assets/id (name, description, media (optional))
  //update assets: http://localhost:8080/asset_mgmt/service/assets/id
  //delete asset: http://localhost:8080/asset_mgmt/service/assets/id
  //get asset: http://localhost:8080/asset_mgmt/service/assets/id
  //get asset: http://localhost:8080/asset_mgmt/service/assets/id
  //get asset: http://localhost:8080/asset_mgmt/service/assets/
  //create asset tag: http://localhost:8080/asset_mgmt/service/assettags/", assetId, tagId
  //create tag: http://localhost:8080/asset_mgmt/service/tags/", tagname



}

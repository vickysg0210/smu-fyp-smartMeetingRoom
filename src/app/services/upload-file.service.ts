import { Component, OnInit, Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import * as AWS from 'aws-sdk/global';
import * as S3 from 'aws-sdk/clients/s3';
 import {Observable} from "rxjs/Observable";

@Injectable({
    providedIn: 'root'
})
export class UploadFileService {
    
    constructor() { }

    uploadfile(file){
      let url;
      const bucket = new S3(
        {
          accessKeyId: 'XXXXXXXXXXXXXXXXXXXX',
          secretAccessKey: 'HDVUBeIZxGWk3j9L8py2dgudZL65bAHwhFoFFQIh',
          region: 'ap-southeast-1'
        }
      );

      const params = {
        Bucket: 'fypuuuu',
        Key: 'jsa-s3/' + file.name,
        Body: file
      };

      return bucket.upload(params/*, function (err, data) {
        if (err) {
          console.log('There was an error uploading your file: ', err);
          return false;
        }

        console.log('Successfully uploaded file.', data);
        this.url = data.Location;
      }*/)
      .promise();
      // .then(
      //   function(data) {
      //     console.log("success! data: ", data);
      //     url = data.Location;
      //     resolve(url);
      //   },
      //   function(err) {
      //     console.log('There was an error uploading your file: ', err);
      //     url = "false";
      //     reject("err");
      //  });
      // return url;
    }

}

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
//import { FileToUpload } from './file-to-upload';
import { Component, Injectable, OnInit } from '@angular/core';
import { FileToUpload } from '../Models/FileToUpload';

@Injectable({
  providedIn: 'root'
})


export class fileuploadservice{

     API_URL = "https://localhost:7280/api/FileUpload/";
      httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        })
    };
    
    constructor(private http: HttpClient) { }

    uploadFile(theFile: FileToUpload) : Observable<any> {
        return this.http.post<FileToUpload>(this.API_URL, theFile,this.httpOptions);
    }
    
    

    // uploadFile(): void {
    //     this.readAndUploadFile(this.theFile);
   // }
    
  }


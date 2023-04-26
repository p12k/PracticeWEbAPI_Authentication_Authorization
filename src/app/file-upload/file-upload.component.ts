import { Component, OnInit } from '@angular/core';
import { fileuploadservice } from '../Service/file-upload.service';
import { FileToUpload } from '../Models/FileToUpload';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent implements OnInit {
  event: any;
  
  constructor(private uploadService: fileuploadservice) { }


  theFile: any = [];
  messages: string[] = [];
   MAX_SIZE: number = 1048576;
  ngOnInit() {

    // Maximum file size allowed to be uploaded = 1MB
    
    
    
  }
  onFileChange() {
    this.theFile = null;
    if (this.event.target.files && this.event.target.files.length > 0) {
        // Don't allow file sizes over 1MB
        if (this.event.target.files[0].size < this.MAX_SIZE) {
            // Set theFile property
            this.theFile =this.event.target.files[0];
        }
        else {
            // Display error message
            this.messages.push("File: " + this.event.target.files[0].name + " is too large to upload.");
        }
    }
}
private readAndUploadFile(theFile: any) {
  let file = new FileToUpload();
  
  // Set File Information
  file.fileName = theFile.name;
  file.fileSize = theFile.size;
  file.fileType = theFile.type;
  file.lastModifiedTime = theFile.lastModified;
  file.lastModifiedDate = theFile.lastModifiedDate;
  
  // Use FileReader() object to get file to upload
  // NOTE: FileReader only works with newer browsers
  let reader = new FileReader();
  
  // Setup onload event for reader
  reader.onload = () => {
      // Store base64 encoded representation of file
      file.fileAsBase64=reader.result?.toString()|| '';
     // reader.result.toString();
      // POST to server
      this.uploadService.uploadFile(file).subscribe(resp => { 
          this.messages.push("Upload complete"); });
  }
  
  // Read the file
  reader.readAsDataURL(theFile);
}
uploadFile(): void {
  this.readAndUploadFile(this.theFile);
}





}

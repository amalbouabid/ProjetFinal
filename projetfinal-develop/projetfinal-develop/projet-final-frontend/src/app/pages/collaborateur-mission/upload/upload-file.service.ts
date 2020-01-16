import { Injectable } from '@angular/core';
import { HttpRequest, HttpEvent, HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {configuration} from '../../../configuration';
@Injectable({
  providedIn: 'root'
})
export class UploadFileService {

  constructor(private http: HttpClient, private config:configuration) { }

  pushFileToStorage(file: File): Observable<HttpEvent<any>> {
    console.log(file,'file id')
    const formdata: FormData = new FormData();

    formdata.append('file', file);

    const req = new HttpRequest('POST', this.config.backendServer+'/uploadFile', formdata,{
      reportProgress: true,
      responseType: 'text'
    });

    return this.http.request(req);
  }

  getFiles(): Observable<any> {
    return this.http.get('/getallfiles');
  }
  downloadFile(id):Observable<any>{
    return this.http.get('http://localhost:8080/downloadFile/'+id ,{reportProgress: true,responseType: "blob",headers: new HttpHeaders().append("Content-Type", "application/json")
    })
  }
}

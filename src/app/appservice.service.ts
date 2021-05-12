import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class AppserviceService {
  baseUrl: string = environment.serverUrl;
  constructor(private http: HttpClient) { }

  PushData(data: any) {
    return this.http.post(this.baseUrl+ '/insertdata',data).pipe(map((response: any) => response));
  }

  getCustomers() {
    return this.http.get(this.baseUrl+ '/getcustomerdetails').pipe(map((response: any) => response));
  }
}

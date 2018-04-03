//   server.service.ts

import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { Observable } from "rxjs/Observable";
import 'rxjs/Rx';

@Injectable()
export class ServerService {

  constructor(private http: Http) { }

  storeServers(servers: any[]) {

    const headers = new Headers({ 'Content-Type': 'application/json' });

    //data.json - create an endpoint for our firebase database
    return this.http.put('https://ng-http-a80b7.firebaseio.com/data.json', servers,
      { headers: headers });
  }

  getServers() {
    return this.http.get('https://ng-http-a80b7.firebaseio.com/data')
      .map(
        (response: Response) => {
          const data = response.json();
          for (const server of data) {
            server.name = 'FETCHED_' + server.name;
          }
          return data;
        }
      )
      .catch(
        (error: Response) => {
          console.log(error);
          return Observable.throw(error);
        }
      );
  }

  getAppName() {
    return this.http.get('https://ng-http-a80b7.firebaseio.com/appName.json')
      .map(
        (response: Response) => {
          return response.json();
        }
      )
  }
}

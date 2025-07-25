import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SubscribeService {
  constructor(private http: HttpClient) {}

  getTableColumns(): Observable<any[]> {
    return this.http.get<any>('/assets/dummy-data.json').pipe(map(data => data.subscribesColumns));
  }

  getSubscribes(): Observable<any[]> {
    return this.http.get<any>('/assets/dummy-data.json').pipe(map(data => data.subscribes));
  }

  addSubscribe(subscribe: any): Observable<any> {
    // For demo, just return the subscribe
    return new Observable(observer => {
      observer.next(subscribe);
      observer.complete();
    });
  }

  updateSubscribe(subscribe: any): Observable<any> {
    // For demo, just return the subscribe
    return new Observable(observer => {
      observer.next(subscribe);
      observer.complete();
    });
  }
}

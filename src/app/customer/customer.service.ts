import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CustomerService {
  constructor(private http: HttpClient) {}

  getTableColumns(): Observable<any[]> {
    return this.http.get<any>('http://localhost:3000/customersColumns');
  }

  getCustomers(): Observable<any[]> {
    return this.http.get<any>('http://localhost:3000/customers');
  }

  addCustomer(customer: any): Observable<any> {
    // For demo, just return the customer
    return new Observable(observer => {
      observer.next(customer);
      observer.complete();
    });
  }
  getChannels(): Observable<any[]> {
    // Example channel data
    return of([
      { channelId: 101, channelName: 'Online', status: 'Active' },
      { channelId: 102, channelName: 'Retail', status: 'Inactive' }
    ]);
  }

  updateCustomer(customer: any): Observable<any> {
    // For demo, just return the customer
    return new Observable(observer => {
      observer.next(customer);
      observer.complete();
    });
  }
}

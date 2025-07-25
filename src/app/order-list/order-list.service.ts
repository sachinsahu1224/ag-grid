import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class OrderListService {
  constructor(private http: HttpClient) {}

  getTableColumns(): Observable<any[]> {
    return this.http.get<any>('/assets/dummy-data.json').pipe(map(data => data.ordersColumns));
  }

  getOrders(page: number, pageSize: number): Observable<{ rows: any[], total: number }> {
    return this.http.get<any>('/assets/dummy-data.json').pipe(
      map(data => {
        const allRows = data.orders || [];
        const rows = allRows.slice((page - 1) * pageSize, page * pageSize);
        return { rows, total: allRows.length };
      })
    );
  }
}

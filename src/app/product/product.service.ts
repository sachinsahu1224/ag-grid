import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ProductService {
  constructor(private http: HttpClient) {}

  getTableColumns(): Observable<any[]> {
    return this.http.get<any>('/assets/dummy-data.json').pipe(map(data => data.productsColumns));
  }

  getProducts(): Observable<any[]> {
    return this.http.get<any>('/assets/dummy-data.json').pipe(map(data => data.products));
  }

  addProduct(product: any): Observable<any> {
    // For demo, just return the product
    return new Observable(observer => {
      observer.next(product);
      observer.complete();
    });
  }

  updateProduct(product: any): Observable<any> {
    // For demo, just return the product
    return new Observable(observer => {
      observer.next(product);
      observer.complete();
    });
  }
}

import { Component, OnInit, Inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';
import { SharedAgGridComponent } from '../shared/ag-grid/ag-grid.component';
import { ProductService } from './product.service';
import { ColDef } from 'ag-grid-community';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, SharedAgGridComponent],
  template: `
    <app-shared-ag-grid
      *ngIf="isBrowser"
      [columnDefs]="columnDefs"
      [dataSource]="dataSource"
      [pageSize]="pageSize">
    </app-shared-ag-grid>
  `
})
export class ProductComponent implements OnInit {
  columnDefs: ColDef[] = [];
  dataSource: any;
  pageSize = 20;
  isBrowser = false;

  constructor(
    private productService: ProductService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit() {
    if (!this.isBrowser) return;
    this.productService.getTableColumns().subscribe(cols => {
      this.columnDefs = cols;
      this.setupDataSource();
    });
  }

  setupDataSource() {
    this.dataSource = {
      getRows: (params: any) => {
        const pageNo = Math.floor(params.startRow / this.pageSize) + 1;
        this.productService.getProducts().subscribe(data => {
          const start = (pageNo - 1) * this.pageSize;
          const end = start + this.pageSize;
          const rows = data.slice(start, end);
          params.successCallback(rows, data.length);
        });
      }
    };
  }
}

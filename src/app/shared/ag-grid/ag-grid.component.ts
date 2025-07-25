import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgGridModule } from 'ag-grid-angular';
import { ColDef } from 'ag-grid-community';
import { SharedTableFilterComponent } from './shared-table-filter.component';

@Component({
  selector: 'app-shared-ag-grid',
  standalone: true,
  imports: [CommonModule, AgGridModule, SharedTableFilterComponent],
  template: `
    <app-shared-table-filter
      [columns]="columnDefs"
      (filterChange)="onFilterChange($event)"
    ></app-shared-table-filter>
    <ag-grid-angular
      style="width: 100vw; height: 100vh; min-height: 100vh; min-width: 100vw;"
      class="ag-theme-alpine full-grid"
      [columnDefs]="columnDefs"
      [rowModelType]="'infinite'"
      [datasource]="dataSource"
      [pagination]="false"
      [cacheBlockSize]="pageSize"
      [rowSelection]="'single'">
    </ag-grid-angular>
  `,
  styleUrls: ['./ag-grid.component.css']
})
export class SharedAgGridComponent {
  @Input() columnDefs: ColDef[] = [];
  @Input() dataSource: any;
  @Input() pageSize = 20;
  @Output() actionOrderList = new EventEmitter<any>();
  @Output() actionProductList = new EventEmitter<any>();

  // Accepts a dynamic column header array and maps to AG Grid format
  @Input() set dynamicHeaders(headers: { field: string, headerName: string }[]) {
    if (headers && Array.isArray(headers)) {
      this.columnDefs = headers.map(col => {
        if (col.field === 'actions') {
          return {
            field: 'actions',
            headerName: 'Actions',
            cellRenderer: (params: any) => {
              const container = document.createElement('div');
              container.style.display = 'flex';
              container.style.gap = '8px';

              const orderBtn = document.createElement('button');
              orderBtn.innerText = 'Go to Order List';
              orderBtn.style.padding = '8px 16px';
              orderBtn.style.background = '#1976d2';
              orderBtn.style.color = 'white';
              orderBtn.style.border = 'none';
              orderBtn.style.borderRadius = '4px';
              orderBtn.style.cursor = 'pointer';
              orderBtn.onclick = () => this.actionOrderList.emit(params.data);

              const productBtn = document.createElement('button');
              productBtn.innerText = 'Go to Product List';
              productBtn.style.padding = '8px 16px';
              productBtn.style.background = '#388e3c';
              productBtn.style.color = 'white';
              productBtn.style.border = 'none';
              productBtn.style.borderRadius = '4px';
              productBtn.style.cursor = 'pointer';
              productBtn.onclick = () => this.actionProductList.emit(params.data);

              container.appendChild(orderBtn);
              container.appendChild(productBtn);
              return container;
            },
            sortable: false,
            filter: false,
            resizable: false
          };
        }
        return {
          field: col.field,
          headerName: col.headerName,
          sortable: true,
          filter: true,
          resizable: true
        };
      });
    }
  }

  filterValues: { [key: string]: string } = {};

  onFilterChange(filters: { [key: string]: string }) {
    this.filterValues = filters;
    // For client-side filtering, re-filter the data and update the grid
    if (this.dataSource && typeof this.dataSource.setFilter === 'function') {
      this.dataSource.setFilter(this.filterValues);
    }
  }
}

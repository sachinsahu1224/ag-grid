import { Component, OnInit, Inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';
import { SharedAgGridComponent } from '../shared/ag-grid/ag-grid.component';
import { CustomerService } from './customer.service';
import { ColDef } from 'ag-grid-community';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customer',
  standalone: true,
  imports: [CommonModule, SharedAgGridComponent],
  template: `
    <div style="margin-bottom: 1rem; display: flex; gap: 1rem;">
      <button (click)="activeTab = 'customer'" [style.background]="activeTab === 'customer' ? '#1976d2' : '#eee'" style="padding: 8px 16px; color: #fff; border: none; border-radius: 4px; cursor: pointer;">Customer List</button>
      <button (click)="activeTab = 'channel'" [style.background]="activeTab === 'channel' ? '#1976d2' : '#eee'" style="padding: 8px 16px; color: #fff; border: none; border-radius: 4px; cursor: pointer;">Channel List</button>
    </div>
    <ng-container *ngIf="activeTab === 'customer'">
      <app-shared-ag-grid
        *ngIf="isBrowser"
        [dynamicHeaders]="dynamicHeadersWithActions"
        [dataSource]="dataSource"
        [pageSize]="pageSize"
        (actionOrderList)="goToOrderList($event)"
        (actionProductList)="goToProductList($event)">
      </app-shared-ag-grid>
    </ng-container>
    <ng-container *ngIf="activeTab === 'channel'">
      <app-shared-ag-grid
        *ngIf="isBrowser"
        [dynamicHeaders]="channelHeaders"
        [dataSource]="channelDataSource"
        [pageSize]="pageSize">
      </app-shared-ag-grid>
    </ng-container>
  `
})
export class CustomerComponent implements OnInit {
  columnDefs: ColDef[] = [];
  dynamicHeaders: { field: string, headerName: string }[] = [];
  dynamicHeadersWithActions: { field: string, headerName: string }[] = [];
  dataSource: any;
  channelHeaders: { field: string, headerName: string }[] = [];
  channelDataSource: any;
  pageSize = 20;
  isBrowser = false;
  activeTab: 'customer' | 'channel' = 'customer';

  constructor(
    private customerService: CustomerService,
    @Inject(PLATFORM_ID) private platformId: Object,
    private router: Router
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit() {
    this.customerService.getTableColumns().subscribe(cols => {
      this.dynamicHeaders = cols;
      this.dynamicHeadersWithActions = [...cols, { field: 'actions', headerName: 'Actions' }];
      this.setupDataSource();
    });
    // Example: channel columns
    this.channelHeaders = [
      { field: 'channelId', headerName: 'Channel ID' },
      { field: 'channelName', headerName: 'Channel Name' },
      { field: 'status', headerName: 'Status' }
    ];
    this.setupChannelDataSource();
  }

  setupDataSource() {
    const self = this;
    this.dataSource = {
      filterValues: {},
      setFilter(filters: { [key: string]: string }) {
        this.filterValues = filters;
      },
      getRows: function(params: any) {
        const pageNo = Math.floor(params.startRow / self.pageSize) + 1;
        self.customerService.getCustomers().subscribe(data => {
          // Apply filters
          let filtered = data;
          if (this.filterValues) {
            Object.keys(this.filterValues).forEach(key => {
              const val = this.filterValues[key];
              if (val) {
                filtered = filtered.filter(row =>
                  row[key] && row[key].toString().toLowerCase().includes(val.toLowerCase())
                );
              }
            });
          }
          const start = (pageNo - 1) * self.pageSize;
          const end = start + self.pageSize;
          const rows = filtered.slice(start, end);
          params.successCallback(rows, filtered.length);
        });
      }
    };
  }

  setupChannelDataSource() {
    const self = this;
    this.channelDataSource = {
      filterValues: {},
      setFilter(filters: { [key: string]: string }) {
        this.filterValues = filters;
      },
      getRows: function(params: any) {
        const pageNo = Math.floor(params.startRow / self.pageSize) + 1;
        // Replace with your channel API/service
        self.customerService.getChannels().subscribe(data => {
          // Apply filters
          let filtered = data;
          if (this.filterValues) {
            Object.keys(this.filterValues).forEach(key => {
              const val = this.filterValues[key];
              if (val) {
                filtered = filtered.filter(row =>
                  row[key] && row[key].toString().toLowerCase().includes(val.toLowerCase())
                );
              }
            });
          }
          const start = (pageNo - 1) * self.pageSize;
          const end = start + self.pageSize;
          const rows = filtered.slice(start, end);
          params.successCallback(rows, filtered.length);
        });
      }
    };
  }

  goToOrderList(row: any) {
    this.router.navigate(['/order-list']);
  }

  goToProductList(row: any) {
    this.router.navigate(['/product']);
  }
}

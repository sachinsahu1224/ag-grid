import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderListComponent } from './order-list.component';
import { SharedAgGridModule } from '../shared/ag-grid/ag-grid.module';

@NgModule({
  imports: [CommonModule, SharedAgGridModule, OrderListComponent],
  exports: [OrderListComponent]
})
export class OrderListModule {}

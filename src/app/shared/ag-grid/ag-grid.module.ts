import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgGridModule } from 'ag-grid-angular';
import { SharedAgGridComponent } from './ag-grid.component';

@NgModule({
  imports: [CommonModule, AgGridModule, SharedAgGridComponent],
  exports: [SharedAgGridComponent]
})
export class SharedAgGridModule {}

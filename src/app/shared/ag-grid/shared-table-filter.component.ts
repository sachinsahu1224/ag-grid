import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-shared-table-filter',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div style="display: flex; gap: 1rem; flex-wrap: wrap; margin-bottom: 1rem; align-items: flex-end;">
      <ng-container *ngFor="let col of columns">
        <div style="min-width: 180px; display: flex; flex-direction: column;">
          <label>{{ col.headerName }}</label>
          <input *ngIf="!col.options" [(ngModel)]="filters[col.field]" [placeholder]="'Search ' + col.headerName" style="padding: 6px; border: 1px solid #ccc; border-radius: 4px;">
          <select *ngIf="col.options" [(ngModel)]="filters[col.field]" style="padding: 6px; border: 1px solid #ccc; border-radius: 4px;">
            <option value="">All</option>
            <option *ngFor="let opt of col.options" [value]="opt">{{ opt }}</option>
          </select>
        </div>
      </ng-container>
      <button (click)="onFilterClick()" style="padding: 8px 16px; background: #1976d2; color: white; border: none; border-radius: 4px; cursor: pointer;">Filter</button>
    </div>
  `
})
export class SharedTableFilterComponent {
  @Input() columns: { field: string, headerName: string, options?: string[] }[] = [];
  @Output() filterChange = new EventEmitter<{ [key: string]: string }>();
  filters: { [key: string]: string } = {};

  onFilterClick() {
    this.filterChange.emit({ ...this.filters });
  }
}

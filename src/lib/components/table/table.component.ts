import { Component, Input, Output, EventEmitter, ContentChild, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableColumn, TableConfig } from '../../models/types';

@Component({
  selector: 'adu-table',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="adu-table-container">
      <table class="adu-table" [class.adu-table-striped]="config.striped" [class.adu-table-hoverable]="config.hoverable">
        <thead class="adu-table-header">
          <tr>
            <th 
              *ngFor="let column of columns"
              [style.width]="column.width"
              [class.adu-table-sortable]="column.sortable && config.sortable"
              (click)="onSort(column)"
              class="adu-table-th"
            >
              <div class="flex items-center justify-between">
                <span>{{ column.label }}</span>
                <span *ngIf="column.sortable && config.sortable" class="adu-table-sort-icon">
                  <span *ngIf="sortColumn === column.key">
                    {{ sortDirection === 'asc' ? '↑' : '↓' }}
                  </span>
                  <span *ngIf="sortColumn !== column.key" class="text-gray-300">↕</span>
                </span>
              </div>
            </th>
          </tr>
        </thead>
        <tbody class="adu-table-body">
          <tr *ngFor="let row of paginatedData; let i = index" class="adu-table-row">
            <td *ngFor="let column of columns" class="adu-table-td">
              <ng-container *ngIf="cellTemplate; else defaultCell">
                <ng-container *ngTemplateOutlet="cellTemplate; context: { $implicit: row, column: column }"></ng-container>
              </ng-container>
              <ng-template #defaultCell>
                {{ getCellValue(row, column) }}
              </ng-template>
            </td>
          </tr>
          <tr *ngIf="paginatedData.length === 0" class="adu-table-empty">
            <td [attr.colspan]="columns.length" class="text-center py-8 text-gray-500">
              <ng-content select="[empty-state]"></ng-content>
              <span *ngIf="!hasEmptyState">No data available</span>
            </td>
          </tr>
        </tbody>
      </table>

      <!-- Pagination -->
      <div *ngIf="config.pageable && totalPages > 1" class="adu-table-pagination">
        <button 
          class="adu-pagination-btn" 
          [disabled]="currentPage === 1"
          (click)="goToPage(currentPage - 1)"
        >
          Previous
        </button>

        <div class="adu-pagination-info">
          Page {{ currentPage }} of {{ totalPages }}
        </div>

        <button 
          class="adu-pagination-btn"
          [disabled]="currentPage === totalPages"
          (click)="goToPage(currentPage + 1)"
        >
          Next
        </button>
      </div>
    </div>
  `,
  styles: [`
    .adu-table-container {
      @apply w-full overflow-x-auto bg-white rounded-lg border border-gray-200;
    }

    .adu-table {
      @apply w-full border-collapse;
    }

    .adu-table-header {
      @apply bg-gray-50 border-b border-gray-200;
    }

    .adu-table-th {
      @apply px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider;
    }

    .adu-table-sortable {
      @apply cursor-pointer hover:bg-gray-100 transition-colors;
    }

    .adu-table-sort-icon {
      @apply ml-2 inline-block;
    }

    .adu-table-body {
      @apply divide-y divide-gray-200;
    }

    .adu-table-row {
      @apply transition-colors;
    }

    .adu-table-striped .adu-table-row:nth-child(even) {
      @apply bg-gray-50;
    }

    .adu-table-hoverable .adu-table-row:hover {
      @apply bg-blue-50;
    }

    .adu-table-td {
      @apply px-6 py-4 text-sm text-gray-900;
    }

    .adu-table-empty {
      @apply bg-gray-50;
    }

    .adu-table-pagination {
      @apply flex items-center justify-between px-6 py-3 border-t border-gray-200 bg-gray-50;
    }

    .adu-pagination-btn {
      @apply px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md;
      @apply hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors;
    }

    .adu-pagination-info {
      @apply text-sm text-gray-700;
    }
  `]
})
export class TableComponent<T = any> {
  @Input() data: T[] = [];
  @Input() columns: TableColumn<T>[] = [];
  @Input() config: TableConfig = {
    sortable: true,
    pageable: true,
    pageSize: 10,
    striped: true,
    hoverable: true
  };

  @ContentChild('cellTemplate') cellTemplate?: TemplateRef<any>;
  @Output() rowClicked = new EventEmitter<T>();
  @Output() sortChanged = new EventEmitter<{ column: string; direction: 'asc' | 'desc' }>();

  sortColumn = '';
  sortDirection: 'asc' | 'desc' = 'asc';
  currentPage = 1;
  hasEmptyState = false;

  ngOnInit() {
    this.config = { ...this.getDefaultConfig(), ...this.config };
  }

  get sortedData(): T[] {
    if (!this.config.sortable || !this.sortColumn) {
      return this.data;
    }

    return [...this.data].sort((a, b) => {
      const aVal = this.getNestedValue(a, this.sortColumn);
      const bVal = this.getNestedValue(b, this.sortColumn);

      if (aVal < bVal) return this.sortDirection === 'asc' ? -1 : 1;
      if (aVal > bVal) return this.sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
  }

  get paginatedData(): T[] {
    if (!this.config.pageable) {
      return this.sortedData;
    }

    const start = (this.currentPage - 1) * (this.config.pageSize || 10);
    const end = start + (this.config.pageSize || 10);
    return this.sortedData.slice(start, end);
  }

  get totalPages(): number {
    return Math.ceil(this.data.length / (this.config.pageSize || 10));
  }

  onSort(column: TableColumn<T>): void {
    if (!column.sortable || !this.config.sortable) return;

    if (this.sortColumn === column.key) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column.key;
      this.sortDirection = 'asc';
    }

    this.sortChanged.emit({ column: column.key, direction: this.sortDirection });
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  getCellValue(row: T, column: TableColumn<T>): any {
    if (column.cellTemplate) {
      return column.cellTemplate(row);
    }
    return this.getNestedValue(row, column.key);
  }

  private getNestedValue(obj: any, path: string): any {
    return path.split('.').reduce((current, prop) => current?.[prop], obj);
  }

  private getDefaultConfig(): TableConfig {
    return {
      sortable: true,
      pageable: true,
      pageSize: 10,
      striped: true,
      hoverable: true
    };
  }
}

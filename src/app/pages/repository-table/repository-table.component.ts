import { Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectReposList } from '../../states/common/common.selector';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef } from 'ag-grid-community';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { IRepository } from '../../common/models/common.model';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-repository-table',
  standalone: true,
  imports: [
    AgGridAngular,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatIconModule,
  ],
  templateUrl: './repository-table.component.html',
  styleUrl: './repository-table.component.scss',
})
export class RepositoryTableComponent implements OnInit {
  columnDefs: ColDef[] = [
    {
      field: 'name',
      headerName: 'Repository Name',
      filter: true,
    },
    { field: 'stargazerCount' },
    { field: 'forkCount' },
    { field: 'url' },
  ];
  defaultColDef = {
    flex: 1,
    minWidth: 100,
  };
  searchControl = new FormControl();
  rowData: IRepository[] = [];
  filteredRowData: IRepository[] = [];

  private store = inject(Store);

  ngOnInit(): void {
    this.store.select(selectReposList).subscribe((repos) => {
      if (repos && repos.length) {
        this.rowData = repos;
        this.filteredRowData = repos;
      }
    });

    this.searchControl.valueChanges
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe((value) => this.filterItems(value));
  }

  filterItems(searchTerm: string) {
    if (!searchTerm) {
      this.filteredRowData = this.rowData;
    } else {
      this.filteredRowData = this.rowData.filter(
        (item) =>
          item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.stargazerCount
            .toString()
            .toLowerCase()
            .includes(searchTerm.toLowerCase()),
      );
    }
  }
}

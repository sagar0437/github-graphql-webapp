import { Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectReposList } from '../../states/common/common.selector';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef } from 'ag-grid-community';

@Component({
  selector: 'app-repository-table',
  standalone: true,
  imports: [AgGridAngular],
  templateUrl: './repository-table.component.html',
  styleUrl: './repository-table.component.scss',
})
export class RepositoryTableComponent implements OnInit {
  columnDefs: ColDef[] = [
    {
      field: 'name',
      headerName: 'Repository Name',
      filter: true,
      floatingFilter: true,
    },
    { field: 'stargazerCount' },
    { field: 'forkCount' },
    { field: 'url' },
  ];

  rowData!: any;
  defaultColDef = {
    flex: 1,
    minWidth: 100,
  };
  private store = inject(Store);

  ngOnInit(): void {
    this.store.select(selectReposList).subscribe((repos) => {
      console.log('wef', repos);
      if (repos && repos.length) {
        this.rowData = repos;
      }
    });
  }
}

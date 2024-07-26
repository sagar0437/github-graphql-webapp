import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'table', pathMatch: 'full' },
  {
    path: 'table',
    loadComponent: () =>
      import('./pages/repository-table/repository-table.component').then(
        (m) => m.RepositoryTableComponent
      ),
  },
  {
    path: 'chart',
    loadComponent: () =>
      import(
        './pages/repository-bar-chart/repository-bar-chart.component'
      ).then((m) => m.RepositoryBarChartComponent),
  },
];

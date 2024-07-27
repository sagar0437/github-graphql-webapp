import { Component, inject } from '@angular/core';
import {
  NavigationEnd,
  Router,
  RouterModule,
  RouterOutlet,
} from '@angular/router';
import { Store } from '@ngrx/store';
import { CommonModule } from '@angular/common';
import { ApolloModule } from 'apollo-angular';
import { getGithubRepos } from './states/common/common.action';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { filter } from 'rxjs';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    MatButtonToggleModule,
    MatButtonModule,
    MatCardModule,
    RouterModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = '';
  private store = inject(Store);

  constructor(private router: Router) {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        switch (event.urlAfterRedirects.replace('/', '')) {
          case 'title':
            this.title = 'Repository Data';
            break;
          case 'chart':
            this.title = 'Repository Bar Chart';
            break;
          case 'error':
            this.title = '';
            break;
          default:
            this.title = 'Repository Data';
            break;
        }
      });
    this.store.dispatch(getGithubRepos({ gitHubUser: environment.gitHubUser }));
  }
}

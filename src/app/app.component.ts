import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { CommonModule } from '@angular/common';
import { ApolloModule } from 'apollo-angular';
import { getGithubRepos } from './states/common/common.action';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'github-graphql-webapp';
  private store = inject(Store);
  constructor() {
    this.store.dispatch(getGithubRepos({ gitHubUser: 'jwasham' }));
  }
}

import { Component, inject } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { CommonModule } from '@angular/common';
import { ApolloModule } from 'apollo-angular';
import { getGithubRepos } from './states/common/common.action';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, MatButtonToggleModule, RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'github-graphql-webapp';
  private store = inject(Store);
  selectedState = 'table';

  constructor() {
    this.store.dispatch(getGithubRepos({ gitHubUser: 'jwasham' }));
  }
  onChange(event: any) {
    console.log(event);
    this.selectedState = event.value;
  }
}

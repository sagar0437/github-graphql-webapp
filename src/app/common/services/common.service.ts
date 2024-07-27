import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { catchError, of } from 'rxjs';

const GET_REPOS = gql`
  query ($user: String!) {
    user(login: $user) {
      repositories(first: 100) {
        nodes {
          name
          stargazerCount
          forkCount
          url
        }
      }
    }
  }
`;

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  constructor(private apollo: Apollo, private router: Router) {}

  getRepos(user: string) {
    return this.apollo
      .watchQuery({
        query: GET_REPOS,
        variables: {
          user,
        },
      })
      .valueChanges.pipe(
        catchError((error) => {
          this.router.navigate(['/error']);
          return of(null);
        })
      );
  }
}

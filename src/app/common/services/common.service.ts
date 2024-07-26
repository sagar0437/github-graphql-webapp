import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

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
  constructor(private apollo: Apollo) {}

  getRepos(user: string) {
    return this.apollo.watchQuery({
      query: GET_REPOS,
      variables: {
        user,
      },
    }).valueChanges;
  }
}

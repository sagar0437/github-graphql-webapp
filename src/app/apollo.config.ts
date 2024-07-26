import { APOLLO_OPTIONS } from 'apollo-angular';
import { ApolloClientOptions, InMemoryCache } from '@apollo/client/core';
import { HttpLink } from 'apollo-angular/http';
import { setContext } from '@apollo/client/link/context';
import { environment } from '../environments/environment';

export function createApollo(httpLink: HttpLink): ApolloClientOptions<any> {
  const http = httpLink.create({ uri: environment.apiUrl });

  const auth = setContext((operation, context) => ({
    headers: {
      Authorization: `Bearer ${environment.token}`,
    },
  }));

  return {
    link: auth.concat(http),
    cache: new InMemoryCache(),
  };
}

export const apolloProviders = [
  {
    provide: APOLLO_OPTIONS,
    useFactory: createApollo,
    deps: [HttpLink],
  },
];

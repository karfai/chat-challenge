/* eslint no-console:0 */
import ApolloClient from 'apollo-boost';
import { HttpLink } from 'apollo-link-http';
import { ApolloLink } from 'apollo-link';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloProvider } from 'react-apollo';
import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import ActionCable from 'actioncable';
import ActionCableLink from 'graphql-ruby-client/subscriptions/ActionCableLink';

import { Grid } from 'semantic-ui-react';

import Identity from '../components/identity';
import Messages from '../components/messages';
import Send from '../components/send';

const cable = ActionCable.createConsumer();

const hasSubscriptionOperation = ({ query: { definitions } }) => {
  return definitions.some(
    ({ kind, operation }) => kind === 'OperationDefinition' && operation === 'subscription'
  );
};

const link = ApolloLink.split(
  hasSubscriptionOperation,
  new ActionCableLink({cable}),
  new HttpLink()
);

const client = new ApolloClient({
  link: new HttpLink(),
  cache: new InMemoryCache()
});

const App = (props) => (
    <Grid container>
      <Grid.Row>
        <Grid.Column><Identity /></Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column><Messages model={ props.model } /></Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column><Send model={ props.model } /></Grid.Column>
      </Grid.Row>
    </Grid>);

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    (<ApolloProvider client={ client }>
       <App />
     </ApolloProvider>),
    document.body.appendChild(document.createElement('div')),
  );
});

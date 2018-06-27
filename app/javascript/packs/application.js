/* eslint no-console:0 */
import ApolloClient from 'apollo-boost';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloProvider } from 'react-apollo';
import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import { Grid } from 'semantic-ui-react';

import Identity from '../components/identity';
import Messages from '../components/messages';
import Send from '../components/send';
import MessagesModel from '../models/messages_model';

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

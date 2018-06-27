import * as _ from 'lodash';
import React from 'react';
import { Container, Grid } from 'semantic-ui-react';
import { Query } from "react-apollo";
import gql from "graphql-tag";

export default class Messages extends React.Component {
  constructor(props) {
    super(props);
    this.state = { messages: [{ text: '12344' }] };
  }

  render_messages(o) {
    debugger;
    let rv = _.map(this.state.messages, (m) => {
      return (
        <Grid.Row>
          <Grid.Column>{ m.text }</Grid.Column>
        </Grid.Row>
      );              
    });

    return rv;
  }
  
  render() {
    return (
      <Query query={gql`
        {
          messages {
            sender
            content
          }
        }`
      }>
      {({ loading, error, data }) => {
        return (
          <Grid>
            { this.render_messages(data) }
          </Grid>
        );
      }}
      </Query>
    );
  }
}

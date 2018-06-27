import * as _ from 'lodash';
import React from 'react';
import { Container, Grid } from 'semantic-ui-react';
import { Query } from "react-apollo";
import gql from "graphql-tag";

const Message = (props) => {
  return (
      <div>{ props.message.sender }: { props.message.content }</div>
  );
};

export default class Messages extends React.Component {
  constructor(props) {
    super(props);
    this.state = { messages: [{ text: '12344' }] };
  }

  render_messages(o) {
    let rv = _.map(o.messages, (m, i) => {
      return (
        <Grid.Row key={ i }>
          <Grid.Column>
            <Message message={ m } />
          </Grid.Column>
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
        if (loading) return (<p>Loading...</p>);
        if (error) return (<p>Error: { error }</p>);
        
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

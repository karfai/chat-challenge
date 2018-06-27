// Copyright (C) 2018 Don Kelly <karfai@gmail.com>

// This program is free software: you can redistribute it and/or
// modify it under the terms of the GNU Affero General Public License
// as published by the Free Software Foundation, either version 3 of
// the License, or (at your option) any later version.

// This program is distributed in the hope that it will be useful, but
// WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU
// Affero General Public License for more details.

// You should have received a copy of the GNU Affero General Public
// License along with this program. If not, see
// <http://www.gnu.org/licenses/>.
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

const Q = gql`{
  messages {
    sender
    content
  }
}`;

const SUB = gql`
subscription {
  messageAdded {
    sender
    content
  }
}
`;

class Messages extends React.Component {
  componentDidMount() {
    this.props.subscribeToNewMessages();
  }
  
  render_messages(ms) {
    return _.map(ms, (m, i) => {
      return (
        <Grid.Row key={i}>
          <Grid.Column><Message message={ m } /></Grid.Column>  
        </Grid.Row>
      );
    });
  }
  
  render() {
    if (this.props.loading) return (<div>Loading...</div>);
    if (this.props.error) return (<div>Error: { this.props.error }</div>);

    return (
      <Grid>
        { this.render_messages(_.get(this.props.data, "messages", [])) }
      </Grid>
    );
  }
}

//    { res => <Messages {...res} /> }

const MessagesWithData = () => (
  <Query query={ Q }>
    {({ subscribeToMore, ...res }) => (
      <Messages
        {...res}
        subscribeToNewMessages={() =>
          subscribeToMore({
            document: SUB,
            variables: {},
            updateQuery: (prev, { subscriptionData }) => {
              if (!subscriptionData.data) return prev;
              const nm = subscriptionData.data.messageAdded;
              return _.assignIn({}, prev, {});
            }
          })
        }
      />                          
    )}
  </Query>
);

export default MessagesWithData;

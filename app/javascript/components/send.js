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
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import React from 'react';
import { Button, Form } from 'semantic-ui-react';

const Q = gql`
  mutation CreateMessage($sender: String!, $content: String!) {
    createMessage(sender: $sender, content: $content) {
      content
    }
  }
`;

export default class Send extends React.Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    let message;
    return (
      <Mutation mutation={ Q }>
        {(createMessage, { data }) => (
         <Form onSubmit={ e => {
           e.preventDefault();
           createMessage({ variables: { sender: 'sender', content: message.value }});
           message.value = '';
         }}
         >
            <Form.Group>
              <input ref={ node => { message = node; } } width={8} />
              <Button type="submit">Send</Button>
            </Form.Group>
          </Form>
        )}
      </Mutation>
    );
  }
}

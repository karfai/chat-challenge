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

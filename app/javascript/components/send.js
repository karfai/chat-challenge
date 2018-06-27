import React from 'react';
import { Button, Form } from 'semantic-ui-react';

export default class Send extends React.Component {
  constructor(props) {
    super(props);
    this.state = { message: '' };
    this.update = this.update.bind(this);
    this.send = this.send.bind(this);
  }
  
  update(e) {
    this.setState({ message: e.target.value });
  }

  send(e) {
  }
  
  render() {
    return (
        <Form>
          <Form.Group>
            <Form.Input value={ this.state.message } onChange={ this.update } width={8} />
            <Button type="submit" onClick={ this.send }>Send</Button>
          </Form.Group>
        </Form>
    );
  }
}

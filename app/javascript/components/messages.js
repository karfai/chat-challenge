import * as _ from 'lodash';
import React from 'react';
import { Container, Grid } from 'semantic-ui-react';

export default class Messages extends React.Component {
  constructor(props) {
    super(props);
    this.state = { messages: [{ text: '12344' }] };
  }

  render_messages() {
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
    let messages = this.render_messages();
    return (
        <Grid>
        { messages }
        </Grid>
    );
  }
}

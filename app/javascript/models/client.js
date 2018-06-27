import ApolloClient from 'apollo-boost';

export default class MessagesClient {
  constructor() {
    this.cl = new ApolloClient({
      uri: '/graphql'
    });
  }
}

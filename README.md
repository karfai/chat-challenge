# Summary

This was originally implemented as a coding challenge. It's a basic
chat system implemented in Rails / React over GraphQL. It uses GraphQL
subscriptions over Action Cable to provide immediate updates to the UI
components which render the messages.

# Running the application

Just use foreman:

```
$ bundle install
$ ./bin/rake db:migrate db:seed
$ bundle exec foreman start
```

# Known issues

1. The user is locked to the name "sender" and they cannot change it
2. The subscriptions do not work (when apollo tries to subscribe)

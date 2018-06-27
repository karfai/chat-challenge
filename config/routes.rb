Rails.application.routes.draw do
  mount ActionCable.server => '/subscriptions'

  post "/graphql", to: "graphql#execute"
  root to: "chat#show"
end

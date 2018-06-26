Rails.application.routes.draw do
  root to: "chat#show"

  get "/identity", to: "identity#new"
  post "/identity", to: "identity#create"
end

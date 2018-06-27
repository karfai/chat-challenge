class Types::SubscriptionType < GraphQL::Schema::Object
  field :messageAdded, Types::MessageType, null: false
end

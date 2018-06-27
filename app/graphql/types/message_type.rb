class Types::MessageType < GraphQL::Schema::Object
  field :sender, String, null: false
  field :content, String, null: false
end

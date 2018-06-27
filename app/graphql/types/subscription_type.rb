class Types::SubscriptionType < GraphQL::Schema::Object
  field(:message_added, { type: Types::MessageType, null: true })

  def message_added
    # ??? Need to implement this otherwise we get a complaint that it's missing
  end
end

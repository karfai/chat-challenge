class Types::QueryType < Types::BaseObject
  field(:messages, [MessageType], null: false) do
    description 'Find all messages'
  end

  def messages
    Message.all
  end
end

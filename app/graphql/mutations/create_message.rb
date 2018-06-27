class Mutations::CreateMessage < GraphQL::Schema::Mutation
  null true
  
  argument :sender,  String, required: true
  argument :content, String, required: true

  field :content, String, null: false

  def resolve(sender:, content:)
    m = Message.create(sender: sender, content: content)
    CoinhouseChatSchema.subscriptions.trigger('messageAdded', {}, m)
    m
  end
end

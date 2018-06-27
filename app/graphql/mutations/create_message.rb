class Mutations::CreateMessage < GraphQL::Schema::Mutation
  null true
  
  argument :sender,  String, required: true
  argument :content, String, required: true

  field :content, String, null: false

  def resolve(sender:, content:)
    m = Message.create(sender: sender, content: content)
    if CoinhouseChatSchema.subscriptions
      CoinhouseChatSchema.subscriptions.trigger('messageAdded', {}, m)
    else
      Rails.logger.warn('no subscriptions')
    end
    m
  end
end

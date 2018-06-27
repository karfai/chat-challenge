class Mutations::CreateMessage < GraphQL::Schema::Mutation
  null true
  
  argument :sender,  String, required: true
  argument :content, String, required: true

  field :content, String, null: false

  def resolve(sender:, content:)
    Message.create(sender: sender, content: content)
  end
end

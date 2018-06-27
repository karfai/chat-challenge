class GraphqlChannel < ApplicationCable::Channel
  def subscribed
    @subscription_ids = []
  end

  # @param [Object] data
  # @return [Object]
  def execute(data)
    Rails.logger.info("GraphqlChannel#execute: #{data.inspect}")

    query = data['query']
    variables = ensure_hash(data['variables'])
    operation_name = data['operationName']
    context = {
      # current_user: current_user,
      # Make sure the channel is in the context
      channel: self
    }

    result = CoinhouseChatSchema.execute(
      query: query,
      context: context,
      variables: variables,
      operation_name: operation_name
    )

    payload = {
      result: result.subscription? ? {data: nil} : result.to_h,
      more: result.subscription?
    }

    # Track the subscription here so we can remove it
    # on unsubscribe.
    if result.context[:subscription_id]
      @subscription_ids << context[:subscription_id]
    end

    transmit(payload)
  end

  def unsubscribed
    @subscription_ids.each do |sid|
      CoinhouseChatSchema.subscriptions.delete_subscription(sid)
    end
  end
end

# Copyright (C) 2018 Don Kelly <karfai@gmail.com>

# This program is free software: you can redistribute it and/or
# modify it under the terms of the GNU Affero General Public License
# as published by the Free Software Foundation, either version 3 of
# the License, or (at your option) any later version.

# This program is distributed in the hope that it will be useful, but
# WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU
# Affero General Public License for more details.

# You should have received a copy of the GNU Affero General Public
# License along with this program. If not, see
# <http://www.gnu.org/licenses/>.
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

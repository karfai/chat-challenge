# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
require 'faker'

senders = [
  Faker::HarryPotter.unique.character,
  Faker::HarryPotter.unique.character,
  Faker::HarryPotter.unique.character,
]
  
20.times.each do
  Message.create(sender: senders.sample, content: Faker::HarryPotter.quote)
end

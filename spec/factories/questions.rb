FactoryGirl.define do
  factory :question do
    user
    title       Faker::Lorem.sentences
    description Faker::Lorem.paragraph
    votes       0
    views       0
  end
end

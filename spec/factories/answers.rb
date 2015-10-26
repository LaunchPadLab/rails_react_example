FactoryGirl.define do
  factory :answer do
    user
    question
    description Faker::Lorem.paragraph
  end
end

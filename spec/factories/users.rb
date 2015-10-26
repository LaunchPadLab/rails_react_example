FactoryGirl.define do
  factory :user do
    sequence :email do |n| "person#{n}@snackoverflow.com" end
    password Faker::Internet.password
  end
end

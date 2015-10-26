class Question < ActiveRecord::Base
  belongs_to :user
  has_many :answers

  scope :with_answers, -> { includes(:answers) }
end

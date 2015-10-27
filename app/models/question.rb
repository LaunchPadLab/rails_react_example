class Question < ActiveRecord::Base
  belongs_to :user
  has_many :answers

  validates :title, :description, :votes, :views, presence: true
  validates :votes, :views, numericality: { only_integer: true }

  scope :with_answers, -> { includes(:answers) }
  scope :with_user,    -> { includes(:user) }
end

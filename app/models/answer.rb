class Answer < ActiveRecord::Base
  belongs_to :user
  belongs_to :question, counter_cache: true

  validates :description, presence: true

  scope :with_user, -> { includes(:user) }
end

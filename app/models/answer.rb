class Answer < ActiveRecord::Base
  belongs_to :user
  belongs_to :question, counter_cache: true

  validates :description, presence: true
end

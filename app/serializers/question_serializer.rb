class QuestionSerializer < ActiveModel::Serializer
  include ActionView::Helpers::DateHelper

  attributes :id, :title, :description, :views, :votes, :answers_count, :email, :created

  def created
    time_ago_in_words(object.created_at)
  end

  def email
    object.user.email
  end
end

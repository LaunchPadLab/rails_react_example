class AnswerSerializer < ActiveModel::Serializer
  include ActionView::Helpers::DateHelper

  attributes :id, :description, :email, :created

  def created
    time_ago_in_words(object.created_at)
  end

  def email
    object.user.email
  end
end

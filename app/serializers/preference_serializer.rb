class PreferenceSerializer < ActiveModel::Serializer
  include ActionView::Helpers::DateHelper

  self.root = false

  attributes :id, :display_name, :notify_on_answer, :daily_digest, :created

  def created
    time_ago_in_words(object.created_at)
  end

  def email
    object.user.email
  end
end

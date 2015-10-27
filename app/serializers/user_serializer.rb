class UserSerializer < ActiveModel::Serializer

  self.root = false

  attributes :id, :email
end

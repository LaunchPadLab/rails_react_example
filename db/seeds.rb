if Rails.env.development?

  %w(Question User).each { |model| model.constantize.destroy_all}

  dave, bh, tom = User.create!([
    {email: "dave@launchpadlab.com", password: "password"},
    {email: "brendan@launchpadlab.com", password: "password"},
    {email: "tom@launchpadlab.com", password: "password"}
  ])

  oreo, snickers = Question.create!([
    {user: dave, title: 'Oreos!', description: 'How do I eat them?', votes: 0, views: 0},
    {user: dave, title: 'Snickers!', description: 'How do I eat them?', votes: 0, views: 0}
  ])

end

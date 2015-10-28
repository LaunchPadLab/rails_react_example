if Rails.env.development?

  %w(Answer Question User).each { |model| model.constantize.destroy_all}

  dave, bh, tom = User.create!([
    {email: "dave@launchpadlab.com",    password: "password"},
    {email: "brendan@launchpadlab.com", password: "password"},
    {email: "tom@launchpadlab.com",     password: "password"}
  ])

  Preference.create!([
    {user: dave, display_name: 'dcizzle', notify_on_answer: false, daily_digest: true},
    {user: bh,   display_name: 'BH',      notify_on_answer: false, daily_digest: true},
    {user: tom,  display_name: 'F&C',     notify_on_answer: true,  daily_digest: true}
  ])

  oreo, snickers, milky_way = Question.create!([
    {user: dave, title: "Oreos!",     description: "How do I eat them?", votes: 0, views: 0},
    {user: dave, title: "Snickers!",  description: "How do I eat them?", votes: 0, views: 0},
    {user: bh,   title: "Milky Way!", description: "How do I eat them?", votes: 0, views: 0}
  ])

  Answer.create!([
    {
      user:        bh,
      question:    oreo,
      description: "It's simple, check the voltage and reduce the resistance to below 2 ohms."
    },
    {
      user:        tom,
      question:    oreo,
      description: "Just stuff them all in your face, duh."
    },
    {
      user:        dave,
      question:    milky_way,
      description: "Seriously? Snickers is they way to go, nuts!"
    }
  ])

end

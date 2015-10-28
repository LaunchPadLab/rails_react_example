class CreatePreferences < ActiveRecord::Migration
  def change
    create_table :preferences do |t|
      t.string :display_name
      t.boolean :notify_on_answer
      t.boolean :daily_digest

      t.belongs_to :user

      t.timestamps null: false
    end
  end
end

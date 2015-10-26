class AddCounterCacheForAnswers < ActiveRecord::Migration
  def change
    change_table :questions do |t|
      t.integer :answers_count, default: 0
    end
  end
end

class CreateWeathers < ActiveRecord::Migration[5.2]
  def change
    create_table :weathers do |t|
      t.string :date
      t.jsonb :temp_data, null: false, default: '{}'

      t.timestamps
    end
  end
end

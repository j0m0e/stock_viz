class CreateStocks < ActiveRecord::Migration
  def change
    create_table :stocks do |t|
    	t.string :name
    	t.string :symbol
    	t.references :user
    	
    end
  end
end

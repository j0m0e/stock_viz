class CreatePortfolios < ActiveRecord::Migration
  def change
    create_table :portfolios do |t|
    	t.string :name
    	t.references :user

    end
  end
end

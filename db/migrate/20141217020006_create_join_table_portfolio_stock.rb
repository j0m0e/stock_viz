class CreateJoinTablePortfolioStock < ActiveRecord::Migration
  def change
    create_join_table :portfolios, :stocks do |t|
      # t.index [:portfolio_id, :stock_id]
      # t.index [:stock_id, :portfolio_id]
    end
  end
end

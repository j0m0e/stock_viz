class StocksController < ApplicationController

	def index
		@stocks = Stock.all
		render json: @stocks
	end

	def get_stock
		ticker = params[:ticker].upcase
		result = YahooFinanceAPI.search_for_stock(ticker)
		render json: result
		#render json: params[:ticker]
	end

	def create
		stock = Stock.new(stock_params)
		stock.user = User.find(session[:current_user_id])
		render json: stock if stock.save
	end

	
	private
	def stock_params
		params.require(:stock).permit(:name, :symbol)
	end

end
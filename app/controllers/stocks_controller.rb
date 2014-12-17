class StocksController < ApplicationController

	def get_stock
		ticker = params[:ticker].upcase
		result = YahooFinanceAPI.search_for_stock(ticker)
		render json: result
		#render json: params[:ticker]
	end

end
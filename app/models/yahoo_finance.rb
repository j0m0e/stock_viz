class YahooFinanceAPI 

	def search_for_stock(symbol)
		request = YahooFinance.quotes([symbol], [:ask, :bid, :pe_ratio, :short_ratio])
		hashed_request = request[0].to_h{|k,v| '#{k} => #{v}'}
		JSON.parse(hashed_request.to_json)
		#render json:
	end


end



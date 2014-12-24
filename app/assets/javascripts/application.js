// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/sstephenson/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require turbolinks
//= require_tree .


$(function(){
	loadStocks();
	console.log('testing yo');
	$('.search').on('click','#stock_search', getInput);
	$('#results').on('click', '.choose_search_result', addStock);
});


var getInput = function(){
	var input = $("input[name='search']").val();
	$("input[name='search']").val('');
	//turn input into :ticker
	var stockInfo = ($.get('/get_stock/' + input)); 
	stockInfo.done(function(data){
		$('#results').empty();
		var heading = $('<h3>').text("Search Result:");
		var newDiv = $('<div>').addClass('search_result');
		var paragraphName = $('<p>').text(data.name).addClass('stock_name');
		var addStockButton = $('<button>').text("Add To Your List").addClass('choose_search_result');
		var paragraphSymbol = $('<p>').text(data.symbol).addClass('stock_symbol');
		paragraphName.appendTo(newDiv);
		addStockButton.appendTo(newDiv);
		paragraphSymbol.prependTo(newDiv);
		newDiv.appendTo('#results');
		heading.prependTo('#results');
})};



var addStock = function(){
	//$('#results').empty();
	var stockName = $('.stock_name').text();
	var stockSymbol = $('.stock_symbol').text();
	var newStock = {stock: {name: stockName, symbol: stockSymbol}};
	$.post('/stocks', newStock).done(function(stock){
		renderStock(stock);
	});
	$('#results').empty();

};

var renderStock = function(stock){
	var stockListItem = $('<li>').text("Stock Symbol: " + stock.symbol + "Company Name: " + stock.name);
	stockListItem.addClass('stock_list_item');
	stockListItem.appendTo('.stock_list');
};

var loadStocks = function(){
	$.get('/stocks').done(function(stocks){
		stocks.forEach(function(stock){
			if (stock.user_id == $("h2").attr('id')){
				makeStockTable(stock);
			}
		});
	});
};

// a list for now but will become a table  
var makeStockTable = function(stock){
	var stockListItem = $('<li>').text("Stock Symbol: " + stock.symbol + " " + "Company Name: " + stock.name);
	stockListItem.css('font-weight', 'bold');
	stockListItem.appendTo('.stock_list');
};





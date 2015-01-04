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
	$('.stock_list').on('click', '.GOOG', testThis);
	$('#show-pe-ratio').click(getPeRatios);
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
	var stockName = $('.stock_name').text();
	var stockSymbol = $('.stock_symbol').text();
	var newStock = {stock: {name: stockName, symbol: stockSymbol}};
	$.post('/stocks', newStock).done(function(stock){
		makeStockTable(stock);
	});
	$('#results').empty();

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
	stockListItem.addClass(stock.symbol);
	stockListItem.css('font-weight', 'bold');
	stockListItem.appendTo('.stock_list');
};

var testThis = function(){
	console.log("i got clicked");
	var tickerSymbol = ($(this)[0].className);
	var stockInfo = ($.get('/get_stock/' + tickerSymbol)); 
	stockInfo.done(function(data){
		console.log(data);
		console.log(data.pe_ratio);
		if(data.pe_ratio > 10){
			var div = $('<div>').css({'height': '80px', 'width': '80px', 'background': 'purple'});
			div.appendTo('.pe-ratio-container');
		}
	})
};



var getPeRatios = function(){
	$('.pe-ratio-container').empty();
	$('.pe-ratio-container').css({visibility: 'visible'});
	$('.stock_list').find('li').each(function(listItem){
			var tickerSymbol = $(this)[0].className;
			var stockInfo = ($.get('/get_stock/' + tickerSymbol));
			stockInfo.done(function(stock){
				circleMyRatios(stock);
			})
	});
};

// renders pe ratios as non-filled in circles via the css stylesheet
var circleMyRatios = function(stock){
		var textDiv = $('<div>').text(stock.symbol + " " + stock.pe_ratio)
												.addClass('text');
		var ratioDiv = $('<div>').addClass('pe-ratio')
									.prependTo(textDiv);
		textDiv.appendTo('.pe-ratio-container');
		colorMyRatios(stock, ratioDiv, textDiv);
};

// fills in circles with appropriate color based on each stock's pe ratio
var colorMyRatios = function(stock, ratioDiv, textDiv){
	
	if(stock.pe_ratio === "N/A"){
		ratioDiv.css({background:'white'});
	}
	else if(stock.pe_ratio < 15){
		ratioDiv.css({background:'green'});
	}
	else if((stock.pe_ratio >= 15) && ( stock.pe_ratio < 25)){
		ratioDiv.css({background:'orange'});
	}
	else{
		ratioDiv.css({background:'red'});
	}
};


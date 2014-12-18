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
	console.log('testing yo');
	$('.search').on('click','#stock_search', getTicker);
});


var getTicker = function(){
	console.log(this);
	var input = $("input[name='search']").val();
	console.log(input);
	$("input[name='search']").val('');
	//turn input into :ticker
	var stockInfo = ($.get('/get_stock/' + input)); //global var for now to test, turn local when done
	stockInfo.done(function(data){
	var newDiv = $('<div>').addClass(input).addClass('stock');
	var paragraph = $('<p>').text(data.name);
	paragraph.appendTo(newDiv);
	newDiv.appendTo('#results');
})};



//stockInfo.done(function(data){
//console.log(data.name)
//})



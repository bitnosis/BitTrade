
/*
 * GET home page.
 */

var theClient = require("../lib/mtgox");
var client = new theClient("my_key", "my_secret");

exports.index = function(req, res){
	client.ticker(function(err, json) {
		if (err) { throw err; }
		var lastvalue = json.data.last.value;	
	
		client.seeDepth(function(err, json){
			var asks3 = json.data.asks.sort(function(a,b){return a.price - b.price;}).splice(this.length-6,6);;
			var bids3 = json.data.bids.sort(function(a,b){return b.price - a.price;}).splice(6,6);;
            res.render('index', { title: 'BitTrade', locals: {data: {'last': lastvalue, asks:asks3, bids:bids3} }})
		});
	});
};


 



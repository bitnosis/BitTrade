
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
			var asks3 = json.data.asks.sort(function(a,b){return a.price - b.price;}).splice(this.length-10,10);
			var asks3 = asks3.sort(function(a,b){return b.price - a.price;});
			var bids3 = json.data.bids.sort(function(a,b){return b.price - a.price;}).splice(10,10);
			var bids3 = bids3.sort(function(a,b){return a.price - b.price;});
            res.render('index', { title: 'BitTrade', locals: {data: {'last': lastvalue, asks:asks3, bids:bids3} }})
		});
	});
};


 



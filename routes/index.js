
/*
 * GET home page.
 */

var theClient = require("../lib/mtgox");
var client = new theClient("my_key", "my_secret");



exports.index = function(req, res){
client.seeDepth(function(err, json) {
    if (err) { throw err; }
var bids = json.data.bids;
var asks = json.data.asks;


    res.render('index', { title: 'BitTrade', locals: {data: [{bids:bids, asks:asks}] }})
});
 
};


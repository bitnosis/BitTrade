$(document).ready(function() {
            
            bids = [];
            asks = [];
            
            $('tr').each(function(){
            	if($(this).hasClass('askrow')){
            	asks.push({"price":$(this).data('price'),"vol":$(this).data('vol')});}
            	else if($(this).hasClass('bidrow')){
            	bids.push({"price":$(this).data('price'),"vol":$(this).data('vol')});
            	}	
            });
 
            var ws = new WebSocket('ws://websocket.mtgox.com/mtgox');
			
			ws.onmessage = function(e){ 
			var d = JSON.parse(e.data);
			//DEBUGGING
			console.log(d);
			if(d.channel_name=="depth.BTCUSD"){
				if(d.depth.type_str=="ask"){
					
					var N = asks.length;
					for(var j=1; j<N; j++){
						if((d.depth.price>asks[j].price)&&(d.depth.price<asks[j-1].price)){
							data = {"price":d.depth.price, "vol":d.depth.volume};
							asks.splice(j, 0, data);
						}
					}

					asks.sort(function(a, b) { return b.price - a.price });
					asks.splice(10,10);
					
					var html="";
					$.each(asks, function(){
					html += "<tr><td class='nodata'></td><td class='nodata'></td><td class='ask price'>$"+this.price+"</td><td class='ask'>"+this.vol+"</td></tr>";
					});
					$('.allasks').html(html);
									
				} else if(d.depth.type_str=="bid"){ 
					var N = bids.length;

					for(var j=1; j<N; j++){
						
						if((d.depth.price<bids[j].price)&&(d.depth.price>bids[j-1].price)){
							data = {"price":d.depth.price, "vol":d.depth.volume};
							bids.splice(j, 0, data);
						}
						
					}
					
					bids.sort(function(a, b) { return a.price - b.price });
					bids.splice(10,10);
					
					var html2 ="";
					$.each(bids, function(){
					html2 += "<tr><td class='bid'>"+this.vol+"</td><td class=' bid price'>$"+this.price+"</td><td class='nodata'></td><td class='nodata'></td></tr>";
					});
					$('.allbids').html(html2);

				};
			};
		};




        });
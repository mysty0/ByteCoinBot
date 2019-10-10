var io = require('socket.io-client')

class Network{
	getTop (){
		this.socket.emit('users_top', 0)
	}

	clickOnBytecoin (times){
		this.socket.emit("click_on_bytecoin", times)
	}

	buyEntity(type, model){
		this.socket.emit("open", "shop_state")
		this.socket.emit("open", "shop_videocards_tab")
		this.socket.emit("buy_entity", type, model)
	}

	constructor(query, debug_packets){
		this.opts = this.getOptions(query)
		var socket = this.socket = io.connect('https://coinbyte.biz:443', this.opts)
		this.user = {}
		this.debug_packets = debug_packets
		this.show_online = false

		var onevent = socket.onevent;
		socket.onevent = function (packet) {
		    var args = packet.data || [];
		    onevent.call (this, packet);    // original call
		    packet.data = ["*"].concat(args);
		    onevent.call(this, packet);      // additional call to catch-all
		};

		socket.on("connect", function () {
			console.log("Connected")
		})
		socket.on('connect_failed', function(er) {
			console.log(er)
		})
		socket.on('connect_error', function(er) {
			console.log(er)
		})
		socket.on('error', function(er) {
			console.log(er)
		})
		socket.on('reconnect', function() {
			console.log("reconnect")
		})
		socket.on('reconnecting', function() {
			console.log("reconnecting")
		})
		socket.on('reconnect_failed', function () {
			console.log("fail")
		})
		socket.on('*', function(data, args){
			if(this.debug_packets)
				console.log(`new packet ${data} ${args}`)
		}.bind(this))
		socket.on("user_data", function(data){
			this.user = data
		}.bind(this))
		socket.on("app_online", function(data){
			if (this.show_online)
				console.log(`Current online ${data}`)
		}.bind(this))
		socket.on("bought_entity", function(data){
			console.log(`Successfully bought ${data}`)
		})
		socket.on("set_coins", function(coins){
			this.user.coins = coins
			console.log(`New coins ${coins}`)
		}.bind(this))
		socket.on("users_top", function(users, place, online){
			console.log(`Place in top: ${place}`)
		})
		socket.on('disconnect', function() {
			console.log("disconnected")
		})
	}

	getOptions(query) {
		return {
			path: '/api/socket',
			reconnection: 1,
			autoConnect: 1,
			query: {
				user_id: query.split("vk_user_id=")[1].split("&")[0],
				query: query
			},
			extraHeaders:{
				"Origin": "https://coinbyte.biz",
			}
		}
	}
}

module.exports = exports = Network;
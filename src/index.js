const yargs = require('yargs');
const Network = require('./network')
const Shop = require('./shop');

var argv = yargs
  .usage('ByteCoin Bot\n\nUsage: $0 [options]')
  .help('help').alias('help', 'h')
  .version('version', '0.0.1').alias('version', 'V')
  .options({
    query: {
    	alias: 'q',
    	description: "Application query starting with '?'",
		requiresArg: true,
		required: true
    },
    auto_clicker: {
    	alias: 'c',
		description: "Enables auto clicker and specifies clicks per second",
		requiresArg: true,
		required: false
    },
    auto_buy: {
		alias: 'b',
		description: "Enables auto buy",
		boolean: true,
		required: false
	},
	ab_interval: {
		description: "Auto buy interval in seconds, default 1000",
		requiresArg: true,
		required: false
	},
	show_online: {
		alias: 'so',
		description: "Printing current online",
		boolean: true,
		required: false
	}
  })
  .argv;

var net = new Network(argv.query, false)

if(argv.show_online) net.show_online = true

var shop = new Shop()

var stdin = process.openStdin();

var auto_clicker = {}

function startClicker(timesPerSecond){
	auto_clicker = setInterval(
		function(){
			//console.log(`click ${timesPerSecond} times`)
			net.clickOnBytecoin(timesPerSecond)
		},1000);
	console.log(`clicker started, ${timesPerSecond} times per second`)
}

if (argv.auto_clicker > 0) startClicker(argv.auto_clicker)
	
function getOptimal(){
	var coefs = shop.calculateCoefficients('videocards', net.user.videocards)
	coefs = coefs.concat(shop.calculateCoefficients('processors', net.user.processors))
	return coefs.reduce((res, en) => en[1] > res[1] ? en : res)
}

auto_buy = {}

function startBuying(interval){
	console.log(`Starting auto-buy with interval ${interval || 1000000}`)
	auto_buy = setInterval(
		function(){
			op = getOptimal()[0]
			type = op.ref.split(':')[0]
			cost = op.cost*net.user[type][op.name]
			console.log(`Buying: ${op} for ${cost}`)
			if(net.user.coins >= cost)
				net.buyEntity(type, op.name)
			else console.log(`Not enough coins, need ${cost}, current ${net.user.coins}`)
		},interval || 1000000);
}

if (argv.auto_buy) startBuying(argv.interval)

stdin.addListener("data", function(d) {
	var input = d.toString().trim().split(' ') 
	switch(input[0]){
		case "help":
			console.log("Commands:")
			console.log("buy [type] [name] - buy item. Example buy videocards standart")
			console.log("top - prints top")
			console.log("info - prints current user state")
			console.log("coins - prints current coins amount")
			console.log("toggle_debut - toggles debug, it will debug every packet that recived")
			console.log("start_clicker - starts autoclicker")
			console.log("speed - shows current mining speed")
			console.log("auto_buy - starts auto buy")
			console.log("stop_buying - stops auto buy")
			break
		case "buy":
			//socket.emit("42[\"buy_entity\",\"videocards\",\"standart\"]")
			if(input.length !== 3) return
			console.log(`buying ${input[1]} ${input[2]}`)
			//socket.emit("open", "shop_state")
			//socket.emit("open", "shop_videocards_tab")
			net.buyEntity(input[1], input[2])
			break
		case "top":
			net.getTop()
			break
		case "info":
			console.log(net.user)
			break
		case "coins":
			console.log(net.user.coins)
			break
		case "toggle_debug":
			debug_packets = !debug_packets
			break
		case "start_clicker":
			if(input.length !== 2) return
			startClicker(input[1])
			break
		case "speed":
			const proc_speed = shop.calculateSpeed('processors', net.user.processors)
			const vc_speed = shop.calculateSpeed('videocards', net.user.videocards)
			const ms_speed = shop.calculateSpeed('mouses', net.user.mouses)
			console.log(`Speed: ${proc_speed+vc_speed}`)
			console.log(`Videocards speed: ${vc_speed}, Processors speed: ${proc_speed}, Mouses speed: ${ms_speed}`)
			break
		case "optimal":
			console.log(getOptimal())
			break
		case "auto_buy":
			console.log("starting buying")
			startBuying()
			break
		case "stop_buying":
			clearInterval(auto_buy)
			break
	}
});

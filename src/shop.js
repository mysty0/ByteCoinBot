class Shop{
	formatCoins(t) {
		return 'number' !== typeof t && (t = Number(t)),
		t.toFixed(9)
	}

	calculateSpeed(type, entries){
		return this.items[type].reduce((speed, el) => speed + entries[el.name] * el.speed, 0)
	}

	calculateCoefficients(type, counts){
		return this.items[type].map((c) => [c, c.speed / Math.max(c.cost * counts[c.name], 1)])
	}

	getPriceWithHand(cost, cound, type) {
		var n = 0;
		if (type === 'processors')
			n = 1.4
		else if (type === 'mouses')
			n = 1.6
		else if (type == 'videocards')
			n = 1.3
		
		while (count--) cost *= n;
		return Number(formatCoins(cost))
	}

	constructor(){
		var s = 1e-9,
		      i = 8,
		      n = 1.6e-8,
		      r = 4 * n,
		      a = 2 * n,
		      o = n,
		      c = 16;

		this.items = {
	        mouses: [
	          {
	            ref: 'mouses:standart',
	            name: 'standart',
	            title: 'Обычная мышка',
	            cost: r,
	            speed: s
	          },
	          {
	            ref: 'mouses:autoclick',
	            name: 'autoclick',
	            title: 'Мышка с автокликером',
	            cost: r * c,
	            speed: s * i
	          },
	          {
	            ref: 'mouses:macros',
	            name: 'macros',
	            title: 'Мышка с макросами',
	            cost: r * Math.pow(c, 2),
	            speed: s * Math.pow(i, 2)
	          },
	          {
	            ref: 'mouses:programmer',
	            name: 'programmer',
	            title: 'Мышка программиста',
	            cost: r * Math.pow(c, 3),
	            speed: s * Math.pow(i, 3)
	          },
	          {
	            ref: 'mouses:satoshi',
	            name: 'satoshi',
	            title: 'Мышка Сатоси Накамото',
	            cost: r * Math.pow(c, 4),
	            speed: s * Math.pow(i, 4)
	          },
	          {
	            ref: 'mouses:hacker',
	            name: 'hacker',
	            title: 'Мышка хакера',
	            cost: r * Math.pow(c, 5),
	            speed: s * Math.pow(i, 5)
	          },
	          {
	            ref: 'mouses:snowden',
	            name: 'snowden',
	            title: 'Мышка Сноудена',
	            cost: r * Math.pow(c, 6),
	            speed: s * Math.pow(i, 6)
	          },
	          {
	            ref: 'mouses:admin',
	            name: 'admin',
	            title: 'Мышка Админа',
	            cost: r * Math.pow(c, 7),
	            speed: s * Math.pow(i, 7)
	          }
	        ],
	        processors: [
	          {
	            ref: 'processors:standart',
	            name: 'standart',
	            title: 'Обычный процессор',
	            cost: a,
	            speed: s
	          },
	          {
	            ref: 'processors:miner100',
	            name: 'miner100',
	            title: 'Процессор Miner X100',
	            cost: a * c,
	            speed: s * i
	          },
	          {
	            ref: 'processors:miner1000',
	            name: 'miner1000',
	            title: 'Супер процессор Miner X1000',
	            cost: a * Math.pow(c, 2),
	            speed: s * Math.pow(i, 2)
	          },
	          {
	            ref: 'processors:miner10000',
	            name: 'miner10000',
	            title: 'Квантовый процессор Miner X10000',
	            cost: a * Math.pow(c, 3),
	            speed: s * Math.pow(i, 3)
	          },
	          {
	            ref: 'processors:tinyuniverse',
	            name: 'tinyuniverse',
	            title: 'Кроховселенный процессор',
	            cost: a * Math.pow(c, 4),
	            speed: s * Math.pow(i, 4)
	          },
	          {
	            ref: 'processors:miniuniverse',
	            name: 'miniuniverse',
	            title: 'Минивселенный процессор',
	            cost: a * Math.pow(c, 5),
	            speed: s * Math.pow(i, 5)
	          },
	          {
	            ref: 'processors:microuniverse',
	            name: 'microuniverse',
	            title: 'Микровселенный процессор',
	            cost: a * Math.pow(c, 6),
	            speed: s * Math.pow(i, 6)
	          },
	          {
	            ref: 'processors:multiuniverse',
	            name: 'multiuniverse',
	            title: 'Мультивселенный процессор',
	            cost: a * Math.pow(c, 7),
	            speed: s * Math.pow(i, 7)
	          }
	        ],
	        videocards: [
	          {
	            ref: 'videocards:standart',
	            name: 'standart',
	            title: 'Интегрированная видеокарта',
	            cost: o,
	            speed: s
	          },
	          {
	            ref: 'videocards:plug',
	            name: 'plug',
	            title: 'Видеокарта-затычка',
	            cost: o * c,
	            speed: s * i
	          },
	          {
	            ref: 'videocards:mining100',
	            name: 'mining100',
	            title: 'Видеокарта Mining V100',
	            cost: o * Math.pow(c, 2),
	            speed: s * Math.pow(i, 2)
	          },
	          {
	            ref: 'videocards:mining1000',
	            name: 'mining1000',
	            title: 'Супер мощная видеокарта Mining V1000',
	            cost: o * Math.pow(c, 3),
	            speed: s * Math.pow(i, 3)
	          },
	          {
	            ref: 'videocards:quant100',
	            name: 'quant100',
	            title: 'Квантовая видеокарта Mining Q100',
	            cost: o * Math.pow(c, 4),
	            speed: s * Math.pow(i, 4)
	          },
	          {
	            ref: 'videocards:thinking',
	            name: 'thinking',
	            title: 'Видеокарта Думатель 42',
	            cost: o * Math.pow(c, 5),
	            speed: s * Math.pow(i, 5)
	          },
	          {
	            ref: 'videocards:earth',
	            name: 'earth',
	            title: 'Видеокарта Blue Earth 54',
	            cost: o * Math.pow(c, 6),
	            speed: s * Math.pow(i, 6)
	          },
	          {
	            ref: 'videocards:bigbang',
	            name: 'bigbang',
	            title: 'Видеокарта Big Bang',
	            cost: o * Math.pow(c, 7),
	            speed: s * Math.pow(i, 7)
	          }
	        ]
		}
	}
}

module.exports = exports = Shop;
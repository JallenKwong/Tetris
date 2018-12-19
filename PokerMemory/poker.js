var poker = {
	img:null,
	suits:['spade','heart','club','diamond','redstar','blackstar'],
	icons:['♠', '♥', '♣', '♦', '★'],
	ranks:['ace','two','three','four','five','six','seven','eight','nine','ten','jack','queen','king','joker'],
	simplifiedRanks:[],
	interval1:[],//横向间隔
	interval2:[],//纵向间隔
	groups:[],//元素如 spade-ace
	groups2:{},//元素如 spade-ace To [♠1, Black]
	cards:{},//cardName To [x,y] 卡左上角位置
	cardWidth:227,
	cardHeight:345,
	log:null,
	init:function(){
		var img = document.createElement("img");
		img.setAttribute("src","poker.jpg");
		this.img = img;
		
		this.simplifiedRanks.push('A');
		for(var i = 2; i <= 10; i++){
			this.simplifiedRanks.push(i.toString());
		}
		this.simplifiedRanks.push('J');
		this.simplifiedRanks.push('Q');
		this.simplifiedRanks.push('K');
		this.simplifiedRanks.push('Joker');
		
		if(this.log != null){
			this.log.debug(this.simplifiedRanks);
		}
		
		this.initGroups();
		this.initCards();
	},
	initGroups:function(){
		var k = 0;//优先级，用于排序
		for(var i = 0; i < 4; i++){
			for(var j = 0; j < 13; j++){
				
				var cardName = this.suits[i] + "-" + this.ranks[j]
				this.groups.push(cardName);
				
				this.groups2[cardName] = [this.icons[i] + this.simplifiedRanks[j] , i % 2 == 0 ? 'black' : 'red', k++];//♥,♦要标红色
			}
		}
		
		//特殊
		//红鬼
		var cardName = this.suits[this.suits.length - 2] + '-' + this.ranks[this.ranks.length - 1];
		this.groups.push(cardName);
		var joker = this.icons[this.icons.length - 1] + this.simplifiedRanks[this.simplifiedRanks.length - 1];
		this.groups2[cardName] = ['r' + joker, 'red', k++];
		
		//黑鬼
		cardName = this.suits[this.suits.length - 1] + '-' + this.ranks[this.ranks.length - 1];
		this.groups.push(cardName);
		this.groups2[cardName] = ['b' + joker, 'black', k++];
		
		//反面
		this.groups.push('back');
		
		if(this.log != null){
			this.log.debug(this.groups);
			this.log.debug(this.groups2);
		}
		
	},
	initCards:function(){
	
		this.interval1 = [41, 33, 33, 33, 33, 34, 33, 34, 34, 33, 48, 49, 48];
		this.interval2 = [40, 37, 35, 35];
		
		for(var i = 0; i < 4; i++){
			for(var j = 0; j < 13; j++){
				
				if(i == 0 && j == 0){//笔头ACE
					this.cards[this.groups[i]] = [this.interval1[0], this.interval2[0]];//[x,y]
				}
				
				if(i == 0 && j > 0){//第一行，笔头行
					var x = this.cards[this.groups[j - 1]][0] + this.cardWidth + this.interval1[j];
					this.cards[this.groups[j]] = [x, this.interval2[0]];
				}
				
				if(i > 0 && j == 0){//第一列，ACE列
					var y = this.cards[this.groups[(i - 1) * 13]][1] + this.cardHeight + this.interval2[i];
					this.cards[this.groups[i * 13]] = [this.interval1[j], y];
				}
				
				if(i > 0 && j > 0){
					var x = this.cards[this.groups[i * 13 + j - 1]][0] + this.cardWidth + this.interval1[j];
					var y = this.cards[this.groups[i * 13 + j - 1]][1];
					this.cards[this.groups[i * 13 + j]] = [x, y];
				}
			}
		}
		
		//特殊处理
		
		//1. 笔头 456在原图顺序不对，若用Win画图修改原图一点点，图片文件大小居然变大一倍，顾放弃修图
		var tmp = this.cards['spade-four'];
		this.cards['spade-four'] = this.cards['spade-five'];
		this.cards['spade-five'] = tmp;
		
		tmp = this.cards['spade-five'];
		this.cards['spade-five'] = this.cards['spade-six']
		this.cards['spade-six'] = tmp;
		
		//2.砖块 JQK需微调，某边没绘制
		this.cards['diamond-jack'][0]++;
		this.cards['diamond-jack'][1]-=2;
		
		this.cards['diamond-queen'][1]-=2;
		
		this.cards['diamond-king'][0]--;
		this.cards['diamond-king'][1]-=2
		//3. 两鬼，一背面需亲手特指
		
		this.cards["redstar-joker"] = [3488, 40];
		this.cards["blackstar-joker"] = [3738, 40];
		this.cards["back"] = [3498, 1173];
		
	},
	drawCardCanvas:function(parentElem, cardName, cw, ch){//画出完整牌，要在onload, onclick等否则绘画不出来
		var co = this.cards[cardName];
		
		if(this.log != null){
			this.log.debug("CardName[" + cardName + "] left-top coordinate is: " + co);
		}
		
		var canvas = document.createElement("canvas");
	
		var canvasWidth = this.cardWidth, canvasHeight = this.cardHeight;
		
		if(cw != undefined && ch != undefined){
			canvasWidth = cw;
			canvasHeight = ch;
		}
		
		if(cw != undefined && ch == undefined){
			canvasWidth = cw;
			canvasHeight = canvasWidth * this.cardHeight / this.cardWidth;
		}
		
		if(cw == undefined && ch != undefined){
			canvasHeight = ch;
			canvasWidth = canvasHeight * this.cardWidth / this.cardHeight;
		}
		
		canvas.setAttribute('class', cardName);
		canvas.setAttribute("width", canvasWidth);
		canvas.setAttribute("height", canvasHeight);
		
		var ctx = canvas.getContext("2d");

		parentElem.appendChild(canvas);
		
		ctx.drawImage(this.img, co[0], co[1], this.cardWidth, this.cardHeight, 0, 0, canvasWidth, canvasHeight);
	
	},
	drawAPartOfCardCanvas:function(parentElem, cardName, cw, ch){//截取牌的左上角
		var co = this.cards[cardName];
		
		if(this.log != null){
			this.log.debug("CardName[" + cardName + "] left-top coordinate is: " + co);
		}
		
		var canvas = document.createElement("canvas");
		
		canvas.setAttribute('class', cardName);
		canvas.setAttribute("width", cw);
		canvas.setAttribute("height", ch);
		
		var ctx = canvas.getContext("2d");

		parentElem.appendChild(canvas);
		
		//参数意思（图片对象，图片上起始坐标x,y,长,宽,画布上绘画起始坐标x,y,长宽）
		ctx.drawImage(this.img, co[0], co[1], cw, ch, 0, 0, cw, ch);
		
	},
	printCardName:function(){
		if(this.groups.length > 0){
			return this.groups.join('\n');
		}
	},
	drawBack:function(canvas){//将画布化成背面
		var co = this.cards['back'];
		var ctx = canvas.getContext("2d");
		var cw = canvas.width, ch = canvas.height;
		ctx.drawImage(this.img, co[0], co[1], cw, ch, 0, 0, cw, ch);
	},
	drawAgain:function(canvas, cardName){
		var co = this.cards[cardName];
		var ctx = canvas.getContext("2d");
		var cw = canvas.width, ch = canvas.height;
		ctx.drawImage(this.img, co[0], co[1], cw, ch, 0, 0, cw, ch);
	}	
};
var log = {
	ranks:['NONE','DEBUG','INFO','WARN','ERROR'],
	currentRank:'NONE',
	debug:function(message){
		if(this.currentRank == 'NONE') return;
	
		if(this.currentRank == 'DEBUG'){
			console.log('[DEBUG] ▼');
			console.log(message);
			console.log('\n');
		}
	},
	info:function(message){
		if(this.currentRank == 'NONE') return;
	
		if(this.currentRank == 'DEBUG' || this.currentRank == 'INFO'){
			console.info('[INFO] ▼');
			console.info(message);
			console.log('\n');
		}
	},
	warn:function(message){
		if(this.currentRank == 'NONE') return;
	
		if(this.currentRank == 'WARN' || this.currentRank == 'DEBUG' 
			|| this.currentRank == 'INFO'){
			console.warn('[WARN] ▼');
			console.warn(message);
			console.log('\n');
		}				
	},
	error:function(message){
		if(this.currentRank == 'NONE') return;
	
		if(this.currentRank == 'ERROR' || this.currentRank == 'WARN' 
			|| this.currentRank == 'DEBUG' || this.currentRank == 'INFO'){
			console.error('[ERROR] ▼');
			console.error(message);
			console.log('\n');
		}
	}
};

(function testLogger(testAble){
	if(testAble){
		var logger = log;
		
		console.log("testLogger...");
		logger.currentRank = 'NONE';
		
		logger.debug("debug");
		logger.info("info");
		logger.warn("warn");
		logger.error("error");
		
		console.log("------------");
		
		logger.currentRank = 'DEBUG';
		logger.debug("debug");
		logger.info("info");
		logger.warn("warn");
		logger.error("error");
		
		console.log("------------");
		
		logger.currentRank = 'INFO';
		logger.debug("debug");
		logger.info("info");
		logger.warn("warn");
		logger.error("error");
		
		console.log("------------");
		
		logger.currentRank = 'WARN';
		logger.debug("debug");
		logger.info("info");
		logger.warn("warn");
		logger.error("error");
		
		console.log("------------");
		
		logger.currentRank = 'ERROR';
		
		logger.debug("debug");
		logger.info("info");
		logger.warn("warn");
		logger.error("error");
		
		console.log("------------");					
	}
})(false);
var Assert = {
	assertTrue:function(actual){
		if(actual != true){
			throw "expect True, but Get False";
		}
	},
	assertFalse:function(actual){
		if(actual != false){
			throw "expect False, but Get True";
		}	
	},
	assertIntegerArrayEqual:function(expect, actual, noorder){
		if(!this.isArray(expect)){
			throw "Except argument is not array";
		}
		
		if(!this.isArray(actual)){
			throw "Actual argument is not array";
		}
		
		if(expect.length != actual.length){
			throw "Two IntegerArrays' Length are not Equal";
		}
	
		if(!noorder){	
			for(var i = 0; i < expect.length; i++){
				
				if(!this.isInteger(expect[i])){
					throw "expect[" + i + "] is " + expect[i] + ", is not integer."
				}
				
				if(!this.isInteger(actual[i])){
					throw "actual[" + i + "] is " + actual[i] + ", is not integer."
				}
				
				if(expect[i] != actual[i]){
					throw "When index is " + i + " ,expect " + expect[i] + ", but get " + actual[i];
				}
			}
		}else{
			for(var i = 0; i < expect.length; i++){
				
				if(!this.isInteger(expect[i])){
					throw "expect[" + i + "] is " + expect[i] + ", is not integer."
				}
				
				if(!this.isInteger(actual[i])){
					throw "actual[" + i + "] is " + actual[i] + ", is not integer."
				}
				
				var existed = false;
				
				for(var j = 0; j < actual.length; j++){
					if(expect[i] == actual[j]){
						existed = true;
						break;
					}
				}
				
				if(!existed){
					throw " actual and except is not equal in not order";
				}
				
			}			
			
		}
	},
	assertTwoDimensionalIntegerArrayEqual:function(expect, actual, noorder){
		if(!this.isArray(expect)){
			throw "Except argument is not array";
		}
		
		if(!this.isArray(actual)){
			throw "Actual argument is not array";
		}
		
		if(expect.length != actual.length){
			throw "Two TwoDimensionalIntegerArrays' Length are not Equal";
		}
		if(!noorder){
			for(var i = 0; i < expect.length; i++){
				this.assertIntegerArrayEqual(expect[i], actual[i]);
			}
		}else{
			var count = 0;
				
			for(var i = 0; i < expect.length; i++){
				for(var j = 0; j < actual.length; j++){
					try{
						this.assertIntegerArrayEqual(expect[i], actual[j])
						count++;
					}catch(err){
						continue;
					}
				}
			}
			
			if(count != expect.length){
				throw " actual and except is not equal in not order";
			}
		}
	},
	assertTwoDimensionalIntegerArrayNotEqual:function(expect, actual, noorder){
		try{
			this.assertTwoDimensionalIntegerArrayEqual(expect, actual, noorder);
		}catch(err){
			return; 
		}
		throw "TwoDimensionalIntegerArray Are Equal, but We expect they are not Equal";
	},
	isArray:function (x) {
		return x.constructor.toString().indexOf("Array") > -1;
	},
	isInteger:function(obj) {
		return Math.floor(obj) === obj;
	}
};
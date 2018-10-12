//单元测试
//var unitTest = false;
var unitTest = true;
if(!unitTest){
	
	if(!tetris){
		throw "Tetris context is undefined!";
	}
	
	var model = tetris.model;
	
	function testGetExtremePositionBlock(){
		//var group = [[0,1],[1,0],[1,2],[2,1]];
		var group = [[1,1],[2,1],[1,2],[2,2]];//正方形
		
		Assert.assertIntegerArrayEqual(group[0], model.getLeftestBlock(group));
		Assert.assertIntegerArrayEqual(group[1], model.getRightestBlock(group));
		Assert.assertIntegerArrayEqual(group[0], model.getTopestBlock(group));
		Assert.assertIntegerArrayEqual(group[2], model.getBottomestBlock(group));
	}
	
	function testReplace(){
		var group = [[0,1],[1,0],[1,2],[2,1]];
		model.replace(group, [1,2], [99,99]);
		Assert.assertTwoDimensionalIntegerArrayEqual([[0,1],[1,0],[99,99],[2,1]], group);
	}
	
	function testCopy(){
		var group = [[0,1],[1,0],[1,2],[2,1]];
		var copyGroup = model.copyTwoDimensionalIntegerArray(group);					
		Assert.assertTwoDimensionalIntegerArrayEqual(group, copyGroup);
		model.replace(group, [1,2], [99,99]);
		//深怕引用的问题
		Assert.assertTwoDimensionalIntegerArrayNotEqual(group, copyGroup);
	}

	testCopy();
	testReplace();
	testGetExtremePositionBlock();
	console.log("Unit Test 1 Pass!!!");
}


if(!unitTest){
	
	if(!tetris){
		throw "Tetris context is undefined!";
	}
	
	var model = tetris.model;
	
	(function testIntegerArrayEqual(){
		Assert.assertIntegerArrayEqual([1, 0], [0, 1], true);
		Assert.assertIntegerArrayEqual([1, 2, 3], [3, 1, 2], true);
		Assert.assertIntegerArrayEqual([1, 0], [1, 0]);
	})();
	
	
	(function assertTwoDimensionalIntegerArrayEqual(){
		var group1 = [[0,1],[1,0],[1,2],[2,1]];
		var group2 = [[0,1],[1,0],[1,2],[2,1]];
		Assert.assertTwoDimensionalIntegerArrayEqual(group1,group2,true);
		
		group1 = [[2,1],[0,1],[1,2],[1,0]];
		group2 = [[0,1],[1,0],[1,2],[2,1]];
		Assert.assertTwoDimensionalIntegerArrayEqual(group1,group2,true);
		
		
		group1 = [[2,1],[5,5],[0,1],[1,2],[1,0]];
		group2 = [[0,1],[1,0],[1,2],[2,1],[5,5]];
		Assert.assertTwoDimensionalIntegerArrayEqual(group1,group2,true);
		
		try{
			group1 = [[2,1],[4,5],[0,1],[1,2],[1,0]];
			group2 = [[0,1],[1,0],[1,2],[2,1],[5,5]];
			Assert.assertTwoDimensionalIntegerArrayEqual(group1,group2,true);
			
			throw "Expect Not Equals";
		}catch(err){
			if(err == "Expect Not Equals"){
				throw err;
			}else{
				//期待assert犯错
				console.log('ok');
			}
		}
		
		try{
			group1 = [[0,1],[1,0],[1,2],[2,1]];
			group2 = [[0,1],[1,0],[1,2],[2,1]];
			Assert.assertTwoDimensionalIntegerArrayEqual(group1,group2,true);
			
			throw "Expect Not Equals";
		}catch(err){
			if(err == "Expect Not Equals"){
				console.log('ok');
			}
		}
		
	})();
	
	(function testFindDifferentBlocks(){
		var group1 = [[0,1],[1,0],[1,2],[2,1]];
		var group2 = [[0,1],[1,0],[1,2],[2,1]];
		
		var result = model.findDifferentBlocks(group1,group2);
		Assert.assertTwoDimensionalIntegerArrayEqual([],result);

	})();
	
	console.log("Unit Test 2 Pass!!!");
}

if(!unitTest){
	var model = tetris.model;
	
	(function testFindSameBlocks(){
		var group1 = [[0,1],[1,0],[1,2],[2,1]];
		var group2 = [[0,1],[1,2],[2,1],[1,0]];
		
		var result = model.findSameBlocks(group1,group2);
		Assert.assertTwoDimensionalIntegerArrayEqual([[0,1],[1,0],[1,2],[2,1]], result, true);
	})();
		
	(function testFindSameBlocks(){
		var group1 = [[0,1],[1,0],[1,2]];
		var group2 = [[0,1],[1,2],[2,1],[1,0]];
		
		var result = model.findSameBlocks(group1,group2);
		Assert.assertTwoDimensionalIntegerArrayEqual([[0,1],[1,0],[1,2]], result, true);
	})();
	
	(function testFindSameBlocks(){
		var group1 = [[0,1],[1,2]];
		var group2 = [[0,1],[1,2],[2,1],[1,0]];
		
		var result = model.findSameBlocks(group1,group2);
		Assert.assertTwoDimensionalIntegerArrayEqual([[1,2],[0,1]], result, true);
	})();
	
	(function testFindDifferentBlocks(){
		var group1 = [[0,1],[1,2],[2,1],[1,0]];
		var group2 = [[0,1],[1,2]];
		
		var result = model.findDifferentBlocks(group1,group2);
		Assert.assertTwoDimensionalIntegerArrayEqual([[2,1],[1,0]], result, true);
		Assert.assertTwoDimensionalIntegerArrayEqual([[1,0],[2,1]], result, true);
		
		group1 = [[0,1],[1,2],[2,1],[1,0]];
		group2 = [[0,1]];
		result = model.findDifferentBlocks(group1,group2);
		Assert.assertTwoDimensionalIntegerArrayEqual([[1,0],[1,2],[2,1]], result, true);
		
		group1 = [[0,1],[1,2],[2,1],[1,0],[5,5]];
		group2 = [[0,1],[5,5]];
		result = model.findDifferentBlocks(group1,group2);
		Assert.assertTwoDimensionalIntegerArrayEqual([[1,2],[1,0],[2,1]], result, true);
		
	})();
	
	console.log("Unit Test 3 Pass!!!");
}


if(!unitTest){
	var model = tetris.model;
	(function testCorrectDirectory(){
		Assert.assertIntegerArrayEqual([0,1], model.correctDirectory.L0R1);
		Assert.assertIntegerArrayEqual([0,1], model.correctDirectory['T3B']);
		Assert.assertIntegerArrayEqual([0,1], model.correctDirectory['T6D']);
		Assert.assertIntegerArrayEqual([0,1], model.correctDirectory['T7D']);
		Assert.assertIntegerArrayEqual([1,0], model.correctDirectory.L1R0);
		
		Assert.assertTrue(model.correctDirectory['T1A'] === undefined);
		Assert.assertTrue(model.correctDirectory['T7C'] === undefined);
		
	})();
	console.log("Unit Test 4 Pass!!!");
}

if(!unitTest){
	var model = tetris.model;
	var view = tetris.view;
	var accumulatedBlocks = model.accumulatedBlocks;
	//tetris.init();不能依赖脚本文件的放置顺序
	
	(function testCheckIfAccumulatedBlocksContain(){
		Assert.assertFalse(model.checkIfAccumulatedBlocksContain([-1, 0],view));
		
		//console.log(accumulatedBlocks);
		//console.log(Assert.isArray(accumulatedBlocks));
		//console.log(accumulatedBlocks.length);
		
		//Assert.assertFalse(model.checkIfAccumulatedBlocksContain([0, 0],view));
		Assert.assertTrue(model.checkIfOverstepping([view.colNum, view.rowNum], view));
		Assert.assertTrue(model.checkIfOverstepping([2, view.rowNum], view));
	})();
	
	console.log("Unit Test 5 Pass!!!");
}
	
if(!unitTest){

	console.log("Unit Test 6 Pass!!!");
}




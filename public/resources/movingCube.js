function movingCube(cubeObj,dim){
	
	this.cubeObj = cubeObj;
	this.dim = dim*dim;
	this.sqrtdim = dim;
		
}

movingCube.prototype.axialclockwise = function(operation){
	
	var where ;
	var indexArray=[];
	var indexArray2=[];
	if(operation==="R"){
		where = 2;
	}
	if(operation==="L'"){
		where = 0;
	}
	if(operation==="M'"){
		where = 1;
	}
	console.log(where);
	indexArray=[where,where+3,where+6];
	indexArray2=[where+6,where+3,where];
	console.log(indexArray);
	madeCubefrontSide = this.cubeObj.front;
	madeCubeupperSide = this.cubeObj.upper;
	madeCubebackSide = this.cubeObj.back;
	madeCubedownSide = this.cubeObj.down;
	
	for(var i =0; i<indexArray.length;i++){
		var a = indexArray[i];
		var b = indexArray2[i];
		var c=madeCubefrontSide[a];
		
		madeCubefrontSide[a]=madeCubedownSide[a];
		madeCubedownSide[a]=madeCubebackSide[b];
		madeCubebackSide[b]=madeCubeupperSide[a];
		madeCubeupperSide[a]=c;
		
		
		
		
	}

} 
movingCube.prototype.axialcounterclockwise = function(operation){
	
	var where ;
	var indexArray=[];
	var indexArray2=[];
	if(operation==="R'"){
		where = 2;
	}
	if(operation==="L"){
		where = 0;
	}
	if(operation==="M"){
		where = 1;
	}
	indexArray=[where,where+3,where+6];
	indexArray2=[where+6,where+3,where];
	madeCubefrontSide = this.cubeObj.front;
	madeCubeupperSide = this.cubeObj.upper;
	madeCubebackSide = this.cubeObj.back;
	madeCubedownSide = this.cubeObj.down;
	for(var i =0; i<indexArray.length;i++){
		
		var a = indexArray[i];
		var b = indexArray2[i];
		var c =madeCubefrontSide[a];
		madeCubefrontSide[a]=madeCubeupperSide[a];
		madeCubeupperSide[a]=madeCubebackSide[b];
		madeCubebackSide[b]=madeCubedownSide[a];
		madeCubedownSide[a]=c;
		
	}
}
movingCube.prototype.horizontalclockwise = function(operation){
	var where ;
	var indexArray=[];
	var indexArray2=[];
	if(operation==="U"){
		where = 0;
	}
	if(operation==="D'"){
		where = 6;
	}
	if(operation==="E'"){
		where = 3;
	}
	indexArray=[where,where+1,where+2];
	indexArray2=[where+2,where+1,where];
	
	madeCubefrontSide = this.cubeObj.front;
	madeCubebackSide = this.cubeObj.back;
	madeCubeleftSide = this.cubeObj.left;
	madeCuberightSide = this.cubeObj.right;
	
	for(var i =0; i<indexArray.length;i++){
		
		var a = indexArray[i];
		var b = indexArray2[i];
		var c=madeCubefrontSide[a];
		madeCubefrontSide[a]=madeCuberightSide[a];
		madeCuberightSide[a]=madeCubebackSide[b];
		madeCubebackSide[b]=madeCubeleftSide[a];
		madeCubeleftSide[a]=c;
		
	}
}
movingCube.prototype.horizontalcounterclockwise=function(operation){
	
	var where ;
	var indexArray=[];
	var indexArray2=[];
	if(operation==="U'"){
		where = 0;
	}
	if(operation==="D"){
		where = 6;
	}
	if(operation==="E"){
		where = 3;
	}
	indexArray=[where,where+1,where+2];
	indexArray2=[where+2,where+1,where];
	madeCubefrontSide = this.cubeObj.front;
	madeCubebackSide = this.cubeObj.back;
	madeCubeleftSide = this.cubeObj.left;
	madeCuberightSide = this.cubeObj.right;
	for(var i =0; i<indexArray.length;i++){
		
		var a = indexArray[i];
		var b = indexArray2[i];
		var c =madeCubefrontSide[a];
		madeCubefrontSide[a]=madeCubeleftSide[a];
		madeCubeleftSide[a]=madeCubebackSide[b];
		madeCubebackSide[b]=madeCuberightSide[a];
		madeCuberightSide[a]=c;
		
	}
}
movingCube.prototype.horizontalaxialclockwise = function(operation){
	var where;
	var where2;
	var where3;
	var where4;
	var upside=[];
	var leftside=[];
	var downside=[];
	var rightside=[];
	var boxArray=[];
	
	var madeCuberightSide = this.cubeObj.right;
	var madeCubeupperSide = this.cubeObj.upper;
	var madeCubedownSide = this.cubeObj.down;
	var madeCubeleftSide = this.cubeObj.left;
	if(operation==="F"){
		where = 6; 
		where2 = 2;
		where3 = 0;
		where4 = 0;
		
	
	}
	if(operation==="S"){
		where = 3;
		where2 = 1;
		where3 = 3;
		where4 = 1;
	}
	if(operation==="B'"){
		where = 0;
		where2 = 0;
		where3 = 6;
		where4 = 2;
	}
	upside=[where,where+1,where+2];
	
	leftside=[(where2)+6,(where2)+3,where2];
	downside=[(where3)+2,(where3)+1,where3];
	rightside=[where4,(where4)+3,(where4)+6];
	
	
	for(var i =0; i<this.sqrtdim;i++){
		
		var a = upside[i];
		var e = madeCubeupperSide[a];
		var b = leftside[i];
		
		var c = downside[i];
		var d = rightside[i];
		
		
		madeCubeupperSide[a]=madeCubeleftSide[b];
		madeCubeleftSide[b]=madeCubedownSide[c];
		madeCubedownSide[c]=madeCuberightSide[d];
		madeCuberightSide[d]=e;
		
	}
	
	
}
movingCube.prototype.horizontalaxialcounterclockwise = function(operation){
	var where;
	var where2;
	var where3;
	var where4;
	var upside=[];
	var leftside=[];
	var downside=[];
	var rightside=[];
	var boxArray=[];
	
	var madeCuberightSide = this.cubeObj.right;
	var madeCubeupperSide = this.cubeObj.upper;
	var madeCubedownSide = this.cubeObj.down;
	var madeCubeleftSide = this.cubeObj.left;
	if(operation==="F'"){
		where = 6; 
		where2 = 2;
		where3 = 0;
		where4 = 0;
		
	
	}
	if(operation==="S'"){
		where = 3;
		where2 = 1;
		where3 = 3;
		where4 = 1;
	}
	if(operation==="B"){
		where = 0;
		where2 = 0;
		where3 = 6;
		where4 = 2;
	}
	upside=[where,where+1,where+2];
	leftside=[(where2)+6,(where2)+3,where2];
	downside1=[(where3)+2,(where3)+1,where3];
	rightside1=[where4,(where4)+3,(where4)+6];
	
	for(var i =0; i<this.sqrtdim;i++){
		
		var a = upside[i];
		var e = madeCubeupperSide[a];
		var b = leftside[i];
		var c = downside1[i];
		var d = rightside1[i];
		
		madeCubeupperSide[a]=madeCuberightSide[d];
		madeCuberightSide[d]=madeCubedownSide[c];
		madeCubedownSide[c]=madeCubeleftSide[b];
		madeCubeleftSide[b]=e;
		
	}
}
movingCube.prototype.selfclockwise = function(operation){
	madeCubefrontSide = this.cubeObj.front;
	madeCubeupperSide = this.cubeObj.upper;
	madeCubebackSide = this.cubeObj.back;
	madeCubedownSide = this.cubeObj.down;
	madeCubeleftSide = this.cubeObj.left;
	madeCuberightSide = this.cubeObj.right;
	if(operation==="R"){
		selfaxialcube = madeCuberightSide;
	}else if(operation==="L"){
		selfaxialcube = madeCubeleftSide;
	}else if(operation==="F"){
		selfaxialcube = madeCubefrontSide;
	}else if(operation==="U"){
		selfaxialcube = madeCubeupperSide;
	}else if(operation==="D"){
		selfaxialcube = madeCubedownSide;
	}else{
		selfaxialcube = madeCubebackSide;
	}
	var sliceArray = [];
	var sliceArray1 = [];
	var sliceArray2 = [];
	var where;
	
	for(var i=0;i<this.sqrtdim;i++){
		console.log("iiiii"+i)
		if(i===0){
			sliceArray[0] =selfaxialcube[i];
			sliceArray[1] =selfaxialcube[i+3];
			sliceArray[2] =selfaxialcube[i+6];
		}
		if(i===1){
			sliceArray1[0] =selfaxialcube[i];
			sliceArray1[1] =selfaxialcube[i+3];
			sliceArray1[2] =selfaxialcube[i+6];
		}else{
			sliceArray2[0] =selfaxialcube[i];
			sliceArray2[1] =selfaxialcube[i+3];
			sliceArray2[2] =selfaxialcube[i+6];
		}
		
		
		
	}
	sliceArray = sliceArray.reverse();//[ , , ]
	sliceArray1 =sliceArray1.reverse();//[ , , ]
	sliceArray2 =sliceArray2.reverse();//[ , ,]
	var resultArray = sliceArray.concat(sliceArray1,sliceArray2);// ([,,],[,,],[,,])
	console.log("length"+sliceArray.length)
	
	
	
	for(var i=0;i<resultArray.length;i++){
		
		selfaxialcube[i]=resultArray[i];
	}
}
movingCube.prototype.selfcounterclockwise = function(operation){
	madeCubefrontSide = this.cubeObj.front;
	madeCubeupperSide = this.cubeObj.upper;
	madeCubebackSide = this.cubeObj.back;
	madeCubedownSide = this.cubeObj.down;
	madeCubeleftSide = this.cubeObj.left;
	madeCuberightSide = this.cubeObj.right;
	if(operation==="R'"){
		selfaxialcube = this.cubeObj.right;
	}else if(operation==="L'"){
		selfaxialcube = this.cubeObj.left;
	}else if(operation==="F'"){
		selfaxialcube = this.cubeObj.front;
	}else if(operation==="U'"){
		selfaxialcube = this.cubeObj.upper;
	}else if(operation==="D'"){
		selfaxialcube = this.cubeObj.down;
	}else{
		selfaxialcube = this.cubeObj.back;
	}
	var sliceArray = [];
	var sliceArray1 = [];
	var sliceArray2 = [];
	var where;
	
	for(var i=0;i<this.sqrtdim;i++){
		if(i===0){
			sliceArray[0] =selfaxialcube[i];
			sliceArray[1] =selfaxialcube[i+3];
			sliceArray[2] =selfaxialcube[i+6];
		}
		if(i===1){
			sliceArray1[0] =selfaxialcube[i];
			sliceArray1[1] =selfaxialcube[i+3];
			sliceArray1[2] =selfaxialcube[i+6];
		}else{
			sliceArray2[0] =selfaxialcube[i];
			sliceArray2[1] =selfaxialcube[i+3];
			sliceArray2[2] =selfaxialcube[i+6];
		}
		
	}
	
	var resultArray = sliceArray2.concat(sliceArray1,sliceArray);
	for(var i=0;i<resultArray.length;i++){
		console.log(resultArray[i])
		selfaxialcube[i]=resultArray[i];
	}
}




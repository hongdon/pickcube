function MakingCubeDiagram(makeCubeObj){
	this.makeCubeObj = makeCubeObj;
	
	
}

//화면에 각 면에 해당하는 알파벳을 찍을 수 있게 하는 메서드
MakingCubeDiagram.prototype.inputfacemarker=function(sq,index,marker){
	
	if(sq){
		var face = sq+index;
		var square = document.getElementById(face);
		square.innerHTML= marker;
	}else{
		alert("큐브 안에다 마크를 표시해 주십시오.");
	}
}
//직접 색을 선택해 큐브를 만들어 주는 메서드
MakingCubeDiagram.prototype.inputcolor = function(){
	
		
	var cubeObj = this.makeCubeObj.full;
	var index;
	var sq;
	var square;
	var dim = this.makeCubeObj.dim;
	
	for(var i=0;i<6;i++){
		
		for(var j=0;j<9;j++){
			//if(cubeObj[i][j].color){
				
				var sq=cubeObj[i][j].face;
				var index = cubeObj[i][j].index;
				var square = sq+(index+1);
				var aa = document.getElementById(square);
				aa.setAttribute("bgcolor", cubeObj[i][j].color);

				
					
				//}
			}
		}
	}
	
	

// 화면상에서 색을 골라 큐브를 만들때 실제 큐브 객체에 관련 정보를 입력하는 메서드 
MakingCubeDiagram.prototype.painting = function(sq,ind,color){
	
	
	if(sq){
		parseInt(ind)
	var left = this.makeCubeObj.left;
	var right = this.makeCubeObj.right;
	var up = this.makeCubeObj.upper;
	var down = this.makeCubeObj.down;
	var front = this.makeCubeObj.front;
	var back = this.makeCubeObj.back;
	console.log(this.makeCubeObj.full);
	if(sq==="L"){
		left[ind-1].index = parseInt(ind)-1; 
		left[ind-1].color = color;
	}
	if(sq==="R"){
		right[ind-1].index = parseInt(ind)-1;
		right[ind-1].color = color;
	}
	if(sq==="F"){
		front[ind-1].index = parseInt(ind)-1;
		front[ind-1].color = color;
	}
	if(sq==="U"){
		up[ind-1].index = parseInt(ind)-1;
		up[ind-1].color = color;
	}
	if(sq==="B"){
		back[ind-1].index = parseInt(ind)-1;
		back[ind-1].color = color;
	}
	if(sq==="D"){
		down[ind-1].index = parseInt(ind)-1;
		down[ind-1].color = color;
	}
	
	
	}
	else{
		alert("큐브칸에만 색 입력이 가능합니다.")
	}
}
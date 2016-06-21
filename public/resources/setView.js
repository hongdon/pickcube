function setView(cubeObj,dim){
	this.cubeObj = cubeObj;
	this.dim = dim*dim;
	this.str = "";
	
}


//배열 전체의 색 설정을 모두 지우는 메서드
setView.prototype.defaultcolorsetter =function(){
		
		
		for(var i=0;i<this.cubeObj.length;i++){
			for(var j=0;j<this.cubeObj[i].length;j++){
				
				this.cubeObj[i][j].color="";
			}
		}
}


//특정 조각에 표시를 할 때 실제 큐브 객체에 정보를 넣어넣는 메서드
setView.prototype.inputmarker = function(sq,index,mark){
	console.log(sq);
	console.log(index);
	console.log(mark);
	for(var i=0;i<this.cubeObj.length;i++){
		
		
			
			for(var j=0;j<this.cubeObj[i].length;j++){
				
				if(this.cubeObj[i][j].index===(index-1)&&this.cubeObj[i][j].face===sq){
					console.log('여기 들어오나.....?')
					this.cubeObj[i][j].marked = mark;
				}
				 
			}
		
	}
	console.log(this.cubeObj);
	
}
//큐브 객체서 넣어놓은 표시 정보를 읽어 화면에 뿌리는 메서드
setView.prototype.setmarker = function(){
	var facesIndex =["L","F","R","B","U","D"];
	for(var i=0;i<this.cubeObj.length;i++){
		
			for(var j=0;j<this.cubeObj[i].length;j++){
				if(this.cubeObj[i][j].marked){
					var sq = facesIndex[i];
					var squareind = sq+(j+1);
					var square = document.getElementById(squareind);
					square.innerHTML=this.cubeObj[i][j].marked;
					
				}
			}
		}
	
}

//조각이 움직이면 그 조각에 있던 표시도 같이 옮겨가야 하므로 옮겨가기 전 자리는 지워져야 한다. 그것을 하는 메서드
setView.prototype.erasemarker=function(){
	

	
for(var i=0;i<this.cubeObj.length;i++){
	var facesIndex =["L","F","R","B","U","D"];
			for(var j=0;j<this.cubeObj[i].length;j++){
				if(this.cubeObj[i][j].marked){
					
					var sq = facesIndex[i];
					var squareind = sq+(j+1);
					var square = document.getElementById(squareind);
					square.textContent = "";
					
				}
			}
			
		}
}

//화면에 표시한 모든 것을 지우는 메서드.
setView.prototype.eraseAllmarkers = function(){
	var facesIndex =["L","F","R","B","U","D"];
	
	for(var i=0;i<facesIndex.length;i++){
		for(var j=0;j<this.dim;j++){
			var coord = facesIndex[i] + (j+1);
			var viewIndex = document.getElementById(coord);
			viewIndex.textContent = "";
		}
	}
	
}
//큐브 객체에서 색 정보를 읽어 화면에 칠해주는 메서드
setView.prototype.colorpainting=function(){
	var facesIndex =["L","F","R","B","U","D"];
	for(var i=0;i<this.cubeObj.length;i++){
		var face = facesIndex[i];
		var square = document.getElementById(face);
		
		for(var j=0;j<this.dim;j++){
			
			var coord = face + (j+1);
			var viewIndex = document.getElementById(coord);
			//if(this.cubeObj[i][j].color!==""){
			//console.log(viewIndex);
			if(viewIndex){
				viewIndex.setAttribute("bgcolor",this.cubeObj[i][j].color);

			}
				//viewIndex.setAttribute("bgcolor",this.cubeObj[i][j].color);
			//}
			
			
		
		}
		
		
	}
	
	
}
//직접 색칠할 때 특정 칸을 선택하면 색을 지워주는 메서드
setView.prototype.removecolorpainting = function(){
	var facesIndex =["L","F","R","B","U","D"];
	for(var i=0;i<this.cubeObj.length;i++){
		var face = facesIndex[i];
		var square = document.getElementById(face);
		for(var j=0;j<this.dim;j++){
			
			var coord = face + (j+1);
			var viewIndex = document.getElementById(coord);
			
	
		
			viewIndex.removeAttribute("bgcolor");			
		
		}
		
		
	}
}

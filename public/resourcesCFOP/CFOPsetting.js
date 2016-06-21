function CFOPsetting(cubeObj,dim){
	this.cubeObj = cubeObj;
	this.dim = dim*dim;
	
}

CFOPsetting.prototype.f2lcubesetting= function(){
	for(var i=0;i<this.cubeObj.length;i++){
		for(var j=0;j<this.cubeObj[i].length;j++){
			if(i===0||i===3){
				if(j===0||j===1||j===2){
					this.cubeObj[i][j].color = "#D5D5D5";
				}
			}
			if(i===2){
				if(j===3||j===4||j===6||j===7){
					this.cubeObj[i][j].color = "green";
				}else{
					this.cubeObj[i][j].color = "#D5D5D5";

				}
			}
			if(i===1){
				if(j===4||j===5||j===7||j===8){
					this.cubeObj[i][j].color = "red";
				}else{
					this.cubeObj[i][j].color = "#D5D5D5";

				}
			}
			if(i===4){
				if(j===4){
					this.cubeObj[i][j].color = "yellow";
				}else{
					this.cubeObj[i][j].color = "#D5D5D5";

				}
			}
			
			
			
			
		}
	}
	console.log(this.cubeObj);
}
CFOPsetting.prototype.orientationcubesetting= function(){
	for(var i=0;i<this.cubeObj.length;i++){
		for(var j=0;j<this.cubeObj[i].length;j++){
			if(i===0){
				if(j===0||j===2||j===1){
					this.cubeObj[i][j].color = "#D5D5D5";
				}
			}
			if(i===1){
				if(j===0||j===1||j===2){
					this.cubeObj[i][j].color = "#D5D5D5";

				}
			}
			if(i===2){
				if(j===1||j===0||j===2){
				
					this.cubeObj[i][j].color = "#D5D5D5";

				}
			}
			if(i===4){
				if(j===4){
				
					this.cubeObj[i][j].color = "yellow";

				}
				else{
					this.cubeObj[i][j].color = "#D5D5D5";
				}
			}
			if(i===3){
				if(j===0||j===1||j===2){
				
					this.cubeObj[i][j].color = "#D5D5D5";

				}
			}
			
			
			
		}
	}
	console.log(this.cubeObj);
}
CFOPsetting.prototype.permutationcubesetting= function(){
	for(var i=0;i<this.cubeObj.length;i++){
		for(var j=0;j<this.cubeObj[i].length;j++){
			if(i===0){
				if(j===0||j===2||j===1){
					this.cubeObj[i][j].color = "#D5D5D5";
				}
				else{
					this.cubeObj[i][j].color="blue";
				}
			}
			if(i===1){
				if(j===0||j===1||j===2){
					this.cubeObj[i][j].color = "#D5D5D5";

				}else{
					this.cubeObj[i][j].color='red';
				}
			}
			if(i===2){
				if(j===1||j===0||j===2){
				
					this.cubeObj[i][j].color = "#D5D5D5";

				}else{
					this.cubeObj[i][j].color='green';
				}
			}
			if(i===4){
				
				
					this.cubeObj[i][j].color = "yellow";

				
			}
			if(i===3){
				if(j===0||j===1||j===2){
				
					this.cubeObj[i][j].color = "#D5D5D5";

				}else{
					this.cubeObj[i][j].color='orange';
				}
			}
			if(i===5){
				this.cubeObj[i][j].color='white';
			}
			
			
			
		}
	}
	console.log(this.cubeObj);
}

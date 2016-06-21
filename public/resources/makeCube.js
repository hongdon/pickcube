function makeCube(dim){
//각 면마다 3층씩 세팅
	this.dim = dim*dim;
	console.log(this.dim)
	this.full = new Array(6);
	this.upper = new Array(this.dim);
	this.front = new Array(this.dim);
	this.down = new Array(this.dim);
	this.back = new Array(this.dim);
	this.left = new Array(this.dim);
	this.right = new Array(this.dim);
	//console.log(this.full.length)
}
makeCube.prototype.colorEraser= 
	function(){
	
	
	for(var i=0;i<this.full.length;i++){
		for(var j=0;j<this.full[i].length;j++){
			
			this.full[i][j].color="#B2EBF4";
		}
	}
	
	
	
	
}
makeCube.prototype.facesSetting=function(facesInputed){
	//inputfacesInputed는 현실에 맞게.. 
	//lfrbud
	if(facesInputed.length===6){
		for(var i =0; i<facesInputed.length;i++){
			if(facesInputed.charAt(i)==="l"){
				//console.log("char"+""+facesInputed.charAt(i));
				this.full[i]=this.left;
			}
			if(facesInputed.charAt(i)==="r"){
				this.full[i]=this.right;
			}
			if(facesInputed.charAt(i)==="b"){
				this.full[i]=this.back;
			}
			if(facesInputed.charAt(i)==="f"){
				this.full[i]=this.front;
			}
			if(facesInputed.charAt(i)==="u"){
				this.full[i]=this.upper;
			}
			if(facesInputed.charAt(i)==="d"){
				this.full[i]=this.down;
			}
		
		}
	
	}else{
		alert("6개 면을 소문자로 입력해 주세요");
	}
	
	
}
makeCube.prototype.setEmpty = function(faceArray){
	
	
	
	
	for(var i =0; i<this.full.length;i++){
		
		for(var j=0; j<this.dim;j++){
			
			
		
		if(this.full[i]===this.left){
			this.full[i][j]={color:"#B2EBF4",index:j,face:"L",marked:""};
		}else if(this.full[i]===this.front){
			this.full[i][j]={color:"#B2EBF4",index:j,face:"F",marked:""};
		}else if(this.full[i]===this.right){
			this.full[i][j]={color:"#B2EBF4",index:j,face:"R",marked:""};
		}else if(this.full[i]===this.back){
			this.full[i][j]={color:"#B2EBF4",index:j,face:"B",marked:""};
		}else if(this.full[i]===this.upper){
			this.full[i][j]={color:"#B2EBF4",index:j,face:"U",marked:""};
		}else if(this.full[i]===this.down){
			this.full[i][j]={color:"#B2EBF4",index:j,face:"D",marked:""};
		}
		}
	
	}
	//return this.full[i];
}



makeCube.prototype.colorStringParser = function(colorstring){
	//colorstring ="bfgoyw";//left-front-right-back-up-down
	var colorArray=[];
	for(var k=0;k<colorstring.length;k++){
		if(colorstring.charAt(k)==="r"){
			colorArray[k]="#FF000";
		}
		if(colorstring.charAt(k)==="y"){
			colorArray[k]="#FFE400";
		}
		if(colorstring.charAt(k)==="g"){
			colorArray[k]="#1DDB16";
		}
		if(colorstring.charAt(k)==="b"){
			colorArray[k]="#0054FF";	
		}
		if(colorstring.charAt(k)==="o"){
			colorArray[k]="FF5E00";
		}
		if(colorstring.charAt(k)==="w"){
			colorArray[k]="#FFFFFF";
		}
	}
	
	return colorArray;
}

makeCube.prototype.setting = function(colorArray){
	
	//var cornerindex = [1,3,7,9];
	//var edgeindex = [2,4,6,8];
	//var centerindex=[5];
	//var result = this.full;
	var indexArray=[];
	var indexArray2=[];
	for(var i=0;i<this.full.length;i++){
		for(var j=0;j<this.dim;j++){
			this.full[i][j].color = colorArray[i];
		
			this.full[i][j].index = j;
			/*if(cornerindex.indexOf(j)){
				result[i][j].index=j;
			}
			if(edgeindex.indexOf(j)){
				result[i][j].index=j;
			}
			if(centerindex.indexOf(j)){
				result[i][j].index=j;
			}*/
		}
		
	}
	//return result;
}

/*var result = new makeCube(3);
var haha = result.facesSetting("lfrbud");
var cuberesult = result.setEmpty(haha);

var makeCubeObj = new makeCube(3);
makeCubeObj.facesSetting("lfrbud")
var CubeResult = makeCubeObj.setEmpty(makeCubeObj.full);
console.log(CubeResult);
//var setCubeObj = new setCube();
var colorArray = makeCubeObj.colorStringParser("brgoyw");
var Cube = makeCubeObj.setting(colorArray);
console.log(colorArray);
console.log(makeCubeObj.full);*/


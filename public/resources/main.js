var makeCubeObj = new makeCube(3);
var view = new setView(makeCubeObj.full,3);
makeCubeObj.facesSetting("lfrbud");
makeCubeObj.setEmpty(makeCubeObj.full);
var cubeDiagram = new MakingCubeDiagram(makeCubeObj);
var moveCubeObj = new movingCube(makeCubeObj,3);
var moveController = new movingController(moveCubeObj);
var parse = new Parser();

var color;
var fmarker;
var marker;
var remove;


$("#setblackImage").click(function(){
	console.log('셋 블랙이미지')
	// 표식 제거
	view.eraseAllmarkers();
	view.erasemarker();
	//커서 index 셋팅
	parse.count=0;
	
	//색 정보가 없는 큐브 객체를 새로 생성
	makeCubeObj.facesSetting("lfrbud");
	makeCubeObj.setEmpty(makeCubeObj.full);
	console.log(makeCubeObj.full);
	
	view.colorpainting();
	// 무빙 기록 지우기 
	parse.eraseoperation();
	parse.writehead();
	
	
})

$("#setDefaultImage").click(function(){
	
	view.eraseAllmarkers();
	view.erasemarker();
	parse.count=0;
	makeCubeObj.setEmpty(makeCubeObj.full);
	var colorArray = makeCubeObj.colorStringParser("brgoyw");
	makeCubeObj.setting(colorArray);
	
	view.colorpainting();
	parse.eraseoperation();
	parse.writehead();
	
})

$("#inputbtn").click(function(){
	
	$('#inputsctr').empty();
	var inputscr = document.getElementById("inputsc");
	console.log(inputscr.value)
	var result = parse.parser(inputscr.value);
	console.log(result);
	var matching = new RegExp(/^[A-Z]{1}$/);
	var matching2 = new RegExp(/^[a-z]{1}$/);
	var matching1 = new RegExp(/^[0-9]{1}$/);
	for(var i=0;i<result[0].length;i++){
		if(result[0][i]!==undefined){
			
			if(!result[0][i].match(matching1)){
				console.log('for 돌고있냐')
				moveController.Controller(result[0][i]);
				parse.writeoperation(result[0][i]);	
				//parse.painterlast();
			}
			else{
				var index = result[0][i];
				console.log(index);
				//parse.writeoperation(result[0][index]);
				//parse.writecomment(result[1][index])
				$('#inputsctr').append(result[1][index])
				
				
			}
			
		}
		
		
		
		
	}
	parse.writehead();
	parse.painterlast();
	view.colorpainting();

	
})

$("#next").click(function(){
	var index = parse.nextmovepointer();
	var indexpara = document.getElementById("inputsctr").getElementsByTagName("span");
	if(index<(indexpara.length)){
		view.erasemarker();
		var result = parse.move(index+1);
		console.log(result);
		if(result==='@'){
			makeCubeObj.setEmpty(makeCubeObj.full);
			var colorArray = makeCubeObj.colorStringParser("brgoyw");
			makeCubeObj.setting(colorArray);
			
			view.colorpainting();
			//parse.eraseoperation();
			parse.writehead();
		}else{
			moveController.Controller(result);
			view.setmarker();
			view.colorpainting();	
		}
		
		
		
		
	}
	
	
})

$("#before").click(function(){
	var index = parse.movebeforepointer();
	
	
	if(index>=0){
		view.erasemarker();
		var result = parse.reversemove(index);
		console.log(result);
		if(result==='@'){
			makeCubeObj.setEmpty(makeCubeObj.full);
			var colorArray = makeCubeObj.colorStringParser("brgoyw");
			makeCubeObj.setting(colorArray);
			
			view.colorpainting();
			//parse.eraseoperation();
			//parse.writehead();
		}else{
		moveController.Controller(result);
		view.setmarker();
		view.colorpainting();	
		}
	}
		
	
})


window.onload = init();
function init(){
	
	var tag = document.getElementsByTagName("input");
	var tag1 = document.getElementsByTagName("td");
	console.log(tag[0]);
	
	for(var i=0; i<tag.length;i++){
		tag[i].onclick=Dofunc;
	}
	for(var j=0;j<tag1.length;j++){
		tag1[j].onclick = Dofunc;
	}
	
}

function Dofunc(eventObj){
	var button = eventObj.target;
	
	var operation = button.value;
	var matching1 = new RegExp(/^[A-Z]{1}\d{1}$/);
	var matching = new RegExp(/^\d{2}$/);
	
	
	if(button.id==="operationbtn"){
				
		view.erasemarker();
		moveController.Controller(operation);
		view.colorpainting();
		parse.writeoperation(operation);
		view.setmarker();
		parse.painterlast();
		//parse.writeheadandtail();
		console.log(makeCubeObj)
	}
	if(button.id==="mark"){
		marker =button.value;
	}
	if(button.id==="color"){
		color=button.value;
	}
	if(button.id==="facemaker"){
		fmarker=button.value;
	}
	if(button.id==="coloreraser"){
		color="#FFFFFF";
	}
	if(button.id==="markerEraser"){
		fmarker="";
	}
	if(button.id.match(matching1)){
		
		var index = button.id.charAt(1);
		var sq = button.id.charAt(0);
				
		
		if(fmarker!==undefined){
			cubeDiagram.inputfacemarker(sq, index, fmarker);
			fmarker="";
		}
		if(color!==undefined){
			console.log(color);
			cubeDiagram.painting(sq,index,color);
			//cubeDiagram.inputcolor();
			view.colorpainting();
		}
		if(marker!==undefined){
			view.inputmarker(sq, index, marker);
			view.setmarker();
		}
		
	}
			
}
$('#base').click(function(){
	var prime = ["R","L","F","U","D","B","M","S","x","y","z"]
	$('#buttonfield').empty();
	for(var i=0;i<prime.length;i++){
	$('#buttonfield').append(
	'<input type="button" class="btn btn-deefault" style="background-color:white" id="operationbtn" value='+prime[i]+'>'
		
	)	
	}			
})
$('#counter').click(function(){
	var prime = ["R'","L'","F'","U'","D'","B'","M'","S'","x'","y'","z'"]
	$('#buttonfield').empty();
	for(var i=0;i<prime.length;i++){
	$('#buttonfield').append(
	'<input type="button" class="btn btn-deefault" id="operationbtn" style="background-color:white" value='+prime[i]+'>'
		
	)	
	}			
})
$('#double').click(function(){
	var prime = ["R2","L2","F2","U2","D2","B2","M2","S2","x2","y2","z2"]
	$('#buttonfield').empty();
	for(var i=0;i<prime.length;i++){
	$('#buttonfield').append(
	'<input type="button" class="btn btn-deefault" id="operationbtn" style="background-color:white" value='+prime[i]+'>'
		
	)	
	}			
})
$('#counterdouble').click(function(){
	var prime = ["R'2","L'2","F'2","F'2","U'2","D'2","B'2","M'2","S'2","x'2","y'2","z'2"]
	$('#buttonfield').empty();
	for(var i=0;i<prime.length;i++){
	$('#buttonfield').append(
	'<input type="button" class="btn btn-deefault" id="operationbtn" style="background-color:white" value='+prime[i]+'>'
		
	)	
	}			
})

$(document).on("click","#operationbtn",function(){
	var operation = $(event.target).val();
	view.erasemarker();
		moveController.Controller(operation);
		view.colorpainting();
		parse.writeoperation(operation);
		view.setmarker();
		parse.painterlast();
		
})

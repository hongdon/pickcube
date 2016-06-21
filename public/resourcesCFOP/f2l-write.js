var makeCubeObj = new makeCube(3);
var view = new setView(makeCubeObj.full,3);
makeCubeObj.facesSetting("lfrbud");
makeCubeObj.setEmpty(makeCubeObj.full);
var f2lsetting = new CFOPsetting(makeCubeObj.full,3);
f2lsetting.f2lcubesetting();
view.colorpainting();
var cubeDiagram = new MakingCubeDiagram(makeCubeObj);
var color;
var fmarker;
var marker;
var remove;
$("#setblackImage").click(function(){
	
	//색 정보가 없는 큐브 객체를 새로 생성
	makeCubeObj.facesSetting("lfrbud");
	makeCubeObj.setEmpty(makeCubeObj.full);
	f2lsetting.f2lcubesetting();
	view.colorpainting();
	
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
		console.log(makeCubeObj)
	}
	if(button.id==="mark"){
		color="";
		marker =button.value;
	}
	if(button.id==="color"){
		marker="";
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
		console.log(button.id+'asdfsadgsdgsdg')
		if(document.get)
			console.log(document.get);
		var index = button.id.charAt(1);
		console.log(index);
		var sq = button.id.charAt(0);
				
		
		if(fmarker!==undefined){
			cubeDiagram.inputfacemarker(sq, index, fmarker);
			fmarker="";
		}
		if(color!==undefined){
			console.log('COLOR:'+color);
			console.log('sq:'+sq+'index:'+index);
			cubeDiagram.painting(sq,index,color);
			//cubeDiagram.inputcolor();
			console.log(makeCubeObj.full)
			view.colorpainting();
		}
		if(marker!==undefined){
			view.inputmarker(sq, index, marker); 
			view.setmarker();
		}
		
	}
			
}

function check() {

		if($("#moves").val()!=""){
			$("#cubeobj").val(makeCubeObj.full)
			
		}else{
			console.log(makeCubeObj.full);

			alert('please input moves')
			return false;
		}
	}
	


$(function(){
	$('#writef2l').click(function(){
		
		if($("#moves").val()!==""){
			$.ajax({
				
				type:"POST",
				url:'/writef2l',
				dataType:'json',
				data:{cubeobj : makeCubeObj.full,comment : $('#comment').val(),moves : $('#moves').val()},
				success:function(data){
					console.log('오긴오니');
					console.log(data);
					//console.log(data);
					if(data){
						///emailcheck='notchecked';
					
					alert('find success');
					$('#queryresultf2lfield').replaceWith(
							'<div class="col-md-6">'
							+'<div class="form-group">'
							+'<label class="control-label" for="moves"> moves'
							+'<input class="form-control" id="moves", name="moves",placeholder="enter moves" type="text">'
							+'<div class="form-group">'
							+'<label class="control-label" for="comment"> comment'
							+'<input class="form-control" id="comment", name="comment",placeholder="enter comment" type="text">'
							+'<button class="btn btn-default" id="replacewritef2lform"> replace!'
					
					
					
					)
					//console.log(data.cubeObj)
					/*for(var i=0;i<data.length;i++){
						console.log(data[i])
						console.log(data[i]._id.toString().valueOf());
						console.log(data[i][0].cubeobj);
						console.log(data[i][0]._id)
						console.log(data[i][0]._id.bytes)
						console.log(data[i][0]._id.toString());	
						
						$('#queryresultf2lfield').append('<tr>'+
								'<td id='+
								'a'+'>'
								+'<a href="/searchf2l?id='+data[i]._id.toString().valueOf()+ '">'+
								data[i].operation+
								
								'</td>'
								+'</tr>'
						)	
						
						
						
					
					}*/
					}else{
						/*console.log('ajaxfalse')
						$('#queryresultf2lfield').append(//'<tr>'
								//'<td id="writenewf2l">'
								'<a href="/writenewf2l">'+
								'검색 결과가 없으십니까? 직접 작성은 어떨까요?'
								//'</td>'
								//+'</tr>'
						)	
					
					}*/
					
				}
				}
			});
			
		}else{
			console.log(makeCubeObj.full);

			alert('please input moves')
			return false;
		}
	
		
		
		
	})
		
	
	
})
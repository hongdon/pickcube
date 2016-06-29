var makeCubeObj = new makeCube(3);

makeCubeObj.facesSetting("lfrbud");
makeCubeObj.setEmpty(makeCubeObj.full);
var orisetting = new CFOPsetting(makeCubeObj.full,3);
orisetting.orientationcubesetting();
var view = new setView(makeCubeObj.full,3);
view.colorpainting();
var cubeDiagram = new MakingCubeDiagram(makeCubeObj);
var moveCubeObj = new movingCube(makeCubeObj,3);
var moveController = new movingController(moveCubeObj);
var color;
var fmarker;
var marker;
var remove;
var parse = new Parser();

$("#setblackImage").click(function(){
	$('#queryresultorifield').empty()

	//색 정보가 없는 큐브 객체를 새로 생성
	makeCubeObj.facesSetting("lfrbud");
	makeCubeObj.setEmpty(makeCubeObj.full);
	orisetting.orientationcubesetting();
	view.colorpainting();
	
})

$("td").click(function(){
	var tdval = $(event.target).attr("id");
	console.log(tdval);
	var matching1 = new RegExp(/^[A-Z]{1}\d{1}$/);
if(tdval.match(matching1)){
	if(color!==""){
		
		var existcolor = $(event.target).attr("bgcolor");
		console.log(existcolor);
		if(existcolor !== '#B2EBF4'){
			var sq = tdval.charAt(0);
			var index = tdval.charAt(1);
			cubeDiagram.painting(sq,index,color);
			view.colorpainting();
			
		}
	}
	if(marker!==""){
		var sq = tdval.charAt(0);
		var index = tdval.charAt(1);
		view.inputmarker(sq,index,marker); 
		view.setmarker();
		//view.colorpainting();
	}
}
})

$('#eraser').click(function(){
	color="#D5D5D5";
})


/*window.onload = init();
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
		
		marker =button.value;
		console.log(marker);
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
		//console.log(button.id+'asdfsadgsdgsdg')
		if(document.get)
			console.log(document.get);
		var index = button.id.charAt(1);
		//console.log(index);
		var sq = button.id.charAt(0);
				
		
		if(fmarker!==undefined){
			cubeDiagram.inputfacemarker(sq, index, fmarker);
			fmarker="";
		}
		if(color!==undefined||color!==""){
			var square = sq+index;
			var exist = document.getElementById(square)
			var existcolor = exist.getAttribute('bgcolor')
			//console.log(existcolor);
			if(existcolor !== '#B2EBF4'){
				console.log('COLOR:'+color);
				console.log('sq:'+sq+'index:'+index);
				cubeDiagram.painting(sq,index,color);
				//cubeDiagram.inputcolor();
				
				view.colorpainting();
				
			}
			
		}
		if(marker!==undefined){
			console.log('if들어오냐')
			view.inputmarker(sq, index, marker); 
			view.setmarker();
		}
		
	}
			
}*/


$(function(){
	$('#orientationsearch').click(function(){
		$.ajax({
			
			type:"POST",
			url:'/searchOri',
			dataType:'json',
			data:{cubeObj : makeCubeObj.full,page : 0},
			success:function(data){
				console.log(data);
				if(data){
				$('#queryresultorifield').empty()
				var totalpage = Math.ceil((data.totpagenum)/5);
				console.log(data)
				for(var i=0;i<data.result.length;i++){
					console.log(data.result[i])
					console.log(data.result[i]._id.toString().valueOf());
					$('#queryresultorifield').append(
							'<table>'+
							'<tr>'+
							//'<td id='+
							//'a'+'>'+
							'<button id="searchOri" class="btn btn-default" value="'+data.result[i]._id.toString().valueOf()+'">'+data.result[i].moves
							+'<button id="dorecommend" class="btn btn-default" value="'+data.result[i]._id.toString().valueOf()+'">추천'
							//+'</td>'
							
							+'</tr>'
							+'<h> 조회수 :'+data.result[i].view+'</h>'
							+'<h> 추천수 :'+data.result[i].recommend+'</h>'
							+'<h> 작성자 :'+data.result[i].nickname+'</h>'
							+'</table>'
							
							
							
							
					)	
					
					
					
				
				}
				$('#queryresultorifield').append(
						'<tr>'
						+'<td>'
						+'<input type="button" class="btn btn-default" id="replacewriteOriform" value="새로 공식을 발견 하셨다구요? 어서 적어주세요!">'
						
						+'</td>'
						+'</tr>'
						+'<tr>'
						+'     '
						+'</tr>'
						)
				$('#queryresultorifield').append(
						'<tr>'
						+'<td id="pagefield">'
						
				)		
				for(var i=0 ; i<totalpage;i++){
					$('#pagefield').append(
						'&nbsp;&nbsp;&nbsp;'+'<span><button id="pagenums" value="'+(i)+'">'+(i+1)+'</span>'
							
					)
					
				}
				$('#pagefield').append(
						
						'</td>'
						+'</tr>'
						
				)	
				
				}
				
				else{
					
					$('#queryresultorifield').empty()
					$('#queryresultorifield').append('<tr>'+
							'<td id="">'+
							'<input type="button" class="btn btn-default" id="replacewriteOriform" value="검색 결과가 없으십니까? 직접 작성은 어떨까요?"> '
							
							+'</td>'
							+'</tr>'
					)	
				
				}
				
			}
		});
		
		
})
		
	
	
})

$(document).on('click','#pagenums',function(){
	
	var butid = $(event.target).val();
	console.log('페이지값'+butid)
		$.ajax({
		type:"post",
		url : '/searchOri',
		dataType : 'json',
		data : {cubeObj : makeCubeObj.full,page : butid},
		success:function(data){
			if(data){
				$('#queryresultorifield').empty()
				var totalpage = Math.ceil((data.totpagenum)/5);
				console.log(data)
				for(var i=0;i<data.result.length;i++){
					console.log(data.result[i])
					console.log(data.result[i]._id.toString().valueOf());
					$('#queryresultorifield').append(
							'<table>'+
							'<tr>'+
							//'<td id='+
							//'a'+'>'+
							'<button id="searchOri" class="btn btn-default" value="'+data.result[i]._id.toString().valueOf()+'">'+data.result[i].moves
							+'<button id="dorecommend" class="btn btn-default" value="'+data.result[i]._id.toString().valueOf()+'">추천'
							//+'</td>'
							
							+'</tr>'
							+'<h> 조회수 :'+data.result[i].view+'</h>'
							+'<h> 추천수 :'+data.result[i].recommend+'</h>'
							+'<h> 작성자 :'+data.result[i].nickname+'</h>'
							+'</table>'
							
							
							
							
					)	
					
					
					
				
				}
				$('#queryresultorifield').append(
						'<tr>'
						+'<td>'
						+'<input type="button" class="btn btn-default" id="replacewriteOriform" value="새로 공식을 발견 하셨다구요? 어서 적어주세요!">'
						
						+'</td>'
						+'</tr>'
						+'<tr>'
						+'     '
						+'</tr>'
						)
				$('#queryresultorifield').append(
						'<tr>'
						+'<td id="pagefield">'
						
				)		
				for(var i=0 ; i<totalpage;i++){
					$('#pagefield').append(
						'&nbsp;&nbsp;&nbsp;'+'<span><button class="btn btn-default" id="pagenums" value="'+(i)+'">'+(i+1)+'</span>'
							
					)
					
				}
				$('#pagefield').append(
						
					'</td>'
						+'</tr>'
						
				)	
				
				}
				
				else{
					
					$('#queryresultorifield').empty()
					$('#queryresultorifield').append('<tr>'+
							'<td id="">'+
							'<input type="button" class="btn btn-default" id="replacewriteOriform" value="검색 결과가 없으십니까? 직접 작성은 어떨까요?"> '
							
							+'</td>'
							+'</tr>'
					)	
				
				}
				
			}
	})
	
})
$(document).on("click","#dorecommend",function(){
	var butid = $(event.target).val();
	console.log("BUTID"+butid)
	$.ajax({
		type:"post",
		url : '/recommendupo',
		dataType : 'json',
		data : {id: butid},
		success:function(data){
			if(data){
				alert("추천 1 업!");
			}
		}
	})
})
$(document).on("click","#cancel",function(){
	$('#queryresultorifield').empty()
})
$(document).on("click","#searchOri",function(){
	var butid = $(event.target).val();


	 
	$.ajax({
			type:"post",
			url:'/searchOribyId',
			dataType:'json',
			data:{id: butid},
			success:function(data){
				if(data){
					parse.count=0;
					var result = parse.parser(data.result.moves);
					console.log(result[0]);
					
					
					
					$('#queryresultorifield').empty()
					$('#queryresultorifield').append('<table>'
							+'<tr id="inputsctr" border="1">'
																	
							
							+'</tr>'
							+'<tr id="commentfield">'
								/*+'<td id="commentfield">'
								+'</td>'*/
							+'</tr>'
							
							+'<tr>'
							+'<td>'
							
							+'<input type="button" id="mark" value="★" class ="btn btn-default">'
							+'</td>'
							+'<td>'
							+'<button id="mark" value=" " class="btn btn-default"> erasemark'
							+'</td>'
							+'</tr>'
							
							+'<tr>'
							+'<td>'
							+'<input type="button" id="before" value="◀" class ="btn btn-default">'

							+'</td>'
							+'<td>'
							+'<input type="button" id="next" value="▶" class ="btn btn-default">'

							+'</td>'
							+'</tr>'
							+'<tr>'
							+'<input type="text" class ="form-control" id= "replyfield" placeholder="이 무브에 대해 하시고 싶은 말씀이 있으시면...">'
							+'<input type="button" class="btn btn-default" id="commitreply" value="리플 입력!">'
							+'</tr>'
							+'</table>'
					)
					if(data.result.nickname===data.session.nickname){
						$("#queryresultorifield").append(
								
								'<button class="btn btn-default" id="modifyoriform" value="'+data.result._id+'"> 수정'							
								+'<button class="btn btn-default" id="deleteori" value="'+data.result._id+'"> 삭제'
								
								)
					}
					for(var i=0;i<result[0].length;i++){
						parse.writeoperation(result[0][i]);
						//parse.painterlast();
					}
					parse.writehead();
					parse.writecomment(data.result.comment)
					parse.painterfirst();
				}
			}
			
	})
})
$(document).on("click","#deleteori",function(){
	var butid = $(event.target).val();
	$.ajax({
		type:"post",
		url:'/deleteori',
		dataType:'json',
		
		data:{id: butid},
		success:function(data){
		$('#queryresultorifield').empty()
		alert('삭제 성공')
		}
	})
	
})
$(document).on("click","#modifyoriform",function(){
		var butid = $(event.target).val();
		$.ajax({
		type:"post",
		url:'/searchOribyId',
		dataType:'json',
		
		data:{id: butid},
		success:function(data){
			console.log(data.result.moves);
			$('#queryresultorifield').empty()
			$('#queryresultorifield').append(
					'<div class="col-md-6">'
					+'<div class="form-group">'
					+'<label class="control-label" for="moves"> moves'
					+'<input class="form-control" id="moves", name="moves",value="" type="text">'
					+'<div class="form-group">'
					+'<label class="control-label" for="comment"> comment'
					+'<input class="form-control" id="comment", name="comment",value="" type="text">'
					//+'<input type="button" class="btn btn-default" id="'+data.result._id+'" value="modifycommit">' 
					+'<button class="btn btn-default" id="modifyori" value=""> commit'							
					)
			$('#moves').val(data.result.moves)
			$('#comment').val(data.result.comment)
			$('#modifyori').val(data.result._id)
		}
		})
})
$(document).on("click","#modifyori",function(){
	var butid = $(event.target).val();
	$.ajax({
		type:"post",
		url:'/modifyori',
		dataType:'json',
		
		data:{id: butid,moves :$('#moves').val(),comment:$('#comment').val()},
		success:function(data){
			if(data){
				$('#queryresultorifield').empty()
				alert('수정성공')
			}
		}
		
		
	})
	
})

$(document).on("click","#mark",function(){
	marker = $(event.target).val();
	color = ""
	console.log(marker);
})
$(document).on("click","#color",function(){
	color = $(event.target).val();
	marker=""
})
$(document).on("click","#before",function(){
var index = parse.movebeforepointer();


	
	if(index>=0){
		view.erasemarker();
		var result = parse.reversemove(index);
		console.log(result);
		moveController.Controller(result);
		view.setmarker();
		view.colorpainting();	
		
	}
})
$(document).on("click","#next",function(){
	
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
$(document).on('click','#writeOri',function(){
	if($("#moves").val()!==""){
		$.ajax({
			
			type:"POST",
			url:'/writeOri',
			dataType:'json',
			data:{cubeobj : makeCubeObj.full,comment : $('#comment').val(),moves : $('#moves').val()},
			success:function(data){
				console.log('오긴오니');
				console.log(data);
				//console.log(data);
				if(data){
					///emailcheck='notchecked';
					$('#queryresultorifield').empty()

				alert('input success');
				//location.href='/writenewf2l'
				/*$('#queryresultorifield').replaceWith('')*/
				
				}
			}
		});
		
	}else{
		console.log(makeCubeObj.full);

		alert('please input moves')
		return false;
	}
})


$(document).on("click","#replacewriteOriform",function(){
	console.log('AAAAAAAAAAAAAAAAAAAAAAAAA')
	console.log('replace 오니')
	$('#queryresultorifield').empty()
	$('#queryresultorifield').append(
							'<div class="col-md-6">'
							+'<div class="form-group">'
							+'<label class="control-label" for="moves"> moves'
							+'<input class="form-control" id="moves", name="moves",placeholder="enter moves" type="text">'
							+'<div class="form-group">'
							+'<label class="control-label" for="comment"> comment'
							+'<input class="form-control" id="comment", name="comment",placeholder="enter comment" type="text">'
							+'<input type="button" class="btn btn-default" id="writeOricompleteform" value="commit">' 
)
})

$(document).on('click',"#writeOricompleteform",function(){

	$('#moves').attr('readOnly',true);
	$('#comment').attr('readOnly',true);
	$('#writeOricompleteform').attr('value','Final commit');
	$('#writeOricompleteform').attr('id','writeOri')
	
})



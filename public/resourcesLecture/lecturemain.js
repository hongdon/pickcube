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
var params;
/*function setid(id){
	this.id = id;
	
}*/
function getUrlParams() {
    var params = {};
    window.location.search.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(str, key, value) { params[key] = value; });
    return params;
} 
$(document).ready(function(){
params = getUrlParams();
console.log(params.id)
if(params.id){
	$('#searchlecture').trigger('click')
}
})

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
	$("#lecturefield").empty()
})

//$("#inputbtn").click(function(){
$(document).on('click','#inputbtn' ,function(){	
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
				//moveController.Controller(result[0][i]);
				if(result[1][index]==="↵"){
					$('#inputsctr').append('<p>')
				}else{
					
					parse.writeoperation(result[0][i]);	

				}
				//parse.painterlast();
			}
			else{
				var index = result[0][i];
				console.log(index);
				//parse.writeoperation(result[0][index]);
				//parse.writecomment(result[1][index])
				if(result[1][index]==="↵"){
					$('#inputsctr').append('<p>')
				}else{
					$('#inputsctr').append('&nbsp;&nbsp;&nbsp;&nbsp;'+result[1][index]+'&nbsp;&nbsp;&nbsp;&nbsp;')

				}
				
				
			}
			
		}
		
		
		
		
	}
	parse.writehead();
	//parse.painterlast();
	parse.painterfirst();
	view.colorpainting();
	//$('#buttons').empty()
	//$('#buttons').append('<span><input type="button" id="lectureCommit" class="btn btn-default" value="글 등록하기"></span>')
	$('#inputbtn').val('글 등록하기');
	$('#inputbtn').attr('id','lectureCommit')
	//$('#inputbtn').val('글 등록하기')
	//$('#inputbtn').attr('id','lectureCommit')
	
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
	'<input type="button" class="btn btn-deefault" id="operationbtn" style="background-color:#FFE400" value='+prime[i]+'>'
		
	)	
	}			
})
$('#counter').click(function(){
	var prime = ["R'","L'","F'","U'","D'","B'","M'","S'","x'","y'","z'"]
	$('#buttonfield').empty();
	for(var i=0;i<prime.length;i++){
	$('#buttonfield').append(
	'<input type="button" class="btn btn-deefault" id="operationbtn" style="background-color:#FFE400" value='+prime[i]+'>'
		
	)	
	}			
})
$('#double').click(function(){
	var prime = ["R2","L2","F2","U2","D2","B2","M2","S2","x2","y2","z2"]
	$('#buttonfield').empty();
	for(var i=0;i<prime.length;i++){
	$('#buttonfield').append(
	'<input type="button" class="btn btn-deefault" id="operationbtn" style="background-color:#FFE400" value='+prime[i]+'>'
		
	)	
	}			
})
$('#counterdouble').click(function(){
	var prime = ["R'2","L'2","F'2","F'2","U'2","D'2","B'2","M'2","S'2","x'2","y'2","z'2"]
	$('#buttonfield').empty();
	for(var i=0;i<prime.length;i++){
	$('#buttonfield').append(
	'<input type="button" class="btn btn-deefault" id="operationbtn" style="background-color:#FFE400" value='+prime[i]+'>'
		
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
		console.log($('#inputsctr').length)
})
$('#writelecture').click(function(){
	
	$('#lecturefield').empty()
	$('#lecturefield').append(
			   '<div>'
	            +' <div>'
	            +'   <span class="header">글제목</span>'
	            +'    <span><input type="text" id="lecturetitle"></span>'
	            +'</div>'
	            +' <div >'
	            +'    <span class="header">글내용</span>'
	            +'    <span><textarea id="inputsc"></textarea></span>'
	            +'</div>'
	           // +'<div class="content_line">'
	           
	            //+'</div>'
	            +'</div>'
	            +'<div><span><input type="button" class="btn btn-defaul" id="inputbtn" value="시뮬레이터등록"></span></div>'
	            +'<div id="buttons"></div>'
	/*'<div class="container" style="width:100%; height:35px">'
	+'<label class="control-label" for="lecturetitle"> 제목'
	+'<input type="text" id="lecturetitle" >'		
	+'</div>'
	+'<div class="container" style="width:100%; height:400px">'
	+'<label class="control-label" for="lecturecontents"> 내용'
	+'<input type="text" id="lecturecontents" style="width:100%; height:315px; overflow:scroll">'		
	+'</div>'*/
	
	)
	
	
})
$(document).on('click','#lectureCommit',function(){
	
	if($('#lecturetitle').val()===""){
		alert('제목을 입력해주세요')
	}else{
		if($('#inputsc').val()===""){
		alert('내용을 입력해주세요')
		}
		else{
			$.ajax({
				
				type:"POST",
				url:'/writelecture',
				dataType:'json',
				data:{title : $('#lecturetitle').val(),contents : $('#inputsc').val(),cubeObj :makeCubeObj.full },
				success:function(data){
					if(data){
						$('#lecturefield').empty()
						$('#lecturefield').append(
						'<p>성공적으로 글이 등록되었습니다.</p>'		
						+'<input type="button" id="showlecturelist" value="목록으로">')
						
					}
				}
			})
		}
		
	}
})


$(document).on('click','#showlecturelist',function(){
	console.log('강의 오냐')
	$.ajax({
		
		type:"POST",
		url:'/showlecturelist',
		dataType:'json',
		//data:{title : $('#lecturetitle').val(),contents : $('#inputsc').val()},
		data : {page : 0},
		success:function(data){
			console.log('강의 오냐')
			if(data){
				var totalpage = Math.ceil((data.totpagenum)/5);

				$('#inputsctr').empty()
				$('#lecturefield').empty()
				//console.log(data)
				//console.log(data.length)
				for(var i=0;i<data.result.length;i++){

				
				$('#lecturefield').append(
						'<table>'+
						'<tr>'
						
						//'<button id="searchf2l" class="btn btn-default" value="'+data[i]._id.toString().valueOf()+'">'+data[i].moves
						//+'<button id="dorecommend" class="btn btn-default" value="'+data[i]._id.toString().valueOf()+'">추천'
						//+'<h2><a id="'+data[i]._id.toString().valueOf()+'">'+data[i].title+'</h2>'
						+'<button id="searchlecture" class="btn btn-default" value="'+data.result[i]._id.toString().valueOf()+'">'+data.result[i].title
						+'&nbsp;&nbsp;&nbsp;&nbsp;'
						+'</tr>'
						+'<h> 조회수 :'+data.result[i].view+'</h>'
						+'<h> 추천수 :'+data.result[i].recommend+'</h>'
						+'<h> 작성자 :'+data.result[i].nickname+'</h>'
						+'</table>'
						
				)
				
			}
				
				
				
				$('#lecturefield').append(
						'<tr>'
						
												
				)		
				for(var i=0 ; i<totalpage;i++){
					$('#lecturefield').append(
							'<td>'
								+'<button class="btn btn-default" id="pagenums" value="'+(i)+'">'+(i+1)
							+'</td>'
					)
					
				}
				$('#pagefield').append(
						
						
						+'</tr>'
						
				)
				
				
				
			}
			else{
				$('#lecturefield').append('<p> 등록된 글이 없습니다! 왼쪽 글쓰기 버튼을 눌러 글을 써주세요!')
			}
		}
	})
})
	
	$(document).on('click','#pagenums',function(){
	
	var butid = $(event.target).val();
	console.log('페이지값'+butid)
		$.ajax({
		type:"post",
		url : '/showlecturelist',
		dataType : 'json',
		data : {cubeObj : makeCubeObj.full,page : butid},
		success:function(data){
			if(data){
				var totalpage = Math.ceil((data.totpagenum)/5);

				$('#inputsctr').empty()
				$('#lecturefield').empty()
				//console.log(data)
				//console.log(data.length)
				for(var i=0;i<data.result.length;i++){

				console.log(data.result[i].view)
				$('#lecturefield').append(
						'<table>'+
						'<tr>'
						
						//'<button id="searchf2l" class="btn btn-default" value="'+data[i]._id.toString().valueOf()+'">'+data[i].moves
						//+'<button id="dorecommend" class="btn btn-default" value="'+data[i]._id.toString().valueOf()+'">추천'
						//+'<h2><a id="'+data[i]._id.toString().valueOf()+'">'+data[i].title+'</h2>'
						+'<button id="searchlecture" class="btn btn-default" value="'+data.result[i]._id.toString().valueOf()+'">'+data.result[i].title
						+'&nbsp;&nbsp;&nbsp;&nbsp;'
						+'</tr>'
						+'<h> 조회수 :'+data.result[i].view+'</h>'
						+'<h> 추천수 :'+data.result[i].recommend+'</h>'
						+'<h> 작성자 :'+data.result[i].nickname+'</h>'
						+'</table>'
						
				)
				
			}
				
				
				
				$('#lecturefield').append(
						'<tr>'
						
												
				)		
				for(var i=0 ; i<totalpage;i++){
					$('#lecturefield').append(
							'<td>'
								+'<button class="btn btn-default" id="pagenums" value="'+(i)+'">'+(i+1)
							+'</td>'
					)
					
				}
				$('#pagefield').append(
						
						
						+'</tr>'
						
				)
				
			}
			else{
				$('#lecturefield').append('<p> 등록된 글이 없습니다! 왼쪽 글쓰기 버튼을 눌러 글을 써주세요!')
			}
		}
	})
	
})
	
	
	
	
	
	
	$(document).on('click','#searchlecture',function(){
		

		
		var butid = $(event.target).val();	
		//}
		//else{
			//var butid = this.id;
			//console.log(butid)
		//}
		if(params.id!==undefined){
			butid = params.id
			console.log(butid);
		}
		
		$.ajax({
			
		type:"POST",
		url:'/searchlecture',
		dataType:'json',
		data:{id: butid},		
		success:function(data){
			if(data){
				parse.count=0;
				console.log(data);
				
				$("#lecturefield").empty()
				$('#inputsctr').empty()
				//$('#buttons').empty()
				var result = parse.parser(data.result.contents);
				console.log(result);
				if(data.result.nickname===data.session.nickname){
					$("#lecturefield").append(
							
							'<button class="btn btn-default" id="modifylectureform" value="'+data.result._id+'"> 수정'							
							+'<button class="btn btn-default" id="deletelecture" value="'+data.result._id+'"> 삭제'
							
							)
				}
				
				
				$("#lecturefield").append(
						
						'<button class="btn btn-default" id="recommend" value="'+data.result._id+'"> ↑'							
						
				)
				
				
						var matching = new RegExp(/^[A-Z]{1}$/);
						var matching2 = new RegExp(/^[a-z]{1}$/);
						var matching1 = new RegExp(/^[0-9]{1}$/);
						for(var i=0;i<result[0].length;i++){
							if(result[0][i]!==undefined){
								
								if(!result[0][i].match(matching1)){
									console.log('for 돌고있냐')
									//moveController.Controller(result[0][i]);
									if(result[1][index]==="↵"){
										$('#inputsctr').append('<p>')
									}else{
										
										parse.writeoperation(result[0][i]);	

									}
									//parse.painterlast();
								}
								else{
									var index = result[0][i];
									console.log(index);
									//parse.writeoperation(result[0][index]);
									//parse.writecomment(result[1][index])
									if(result[1][index]==="↵"){
										$('#inputsctr').append('<p>')
									}else{
										$('#inputsctr').append('&nbsp;&nbsp;&nbsp;&nbsp;'+result[1][index]+'&nbsp;&nbsp;&nbsp;&nbsp;')

									}
									
									
								}
								
							}
							
							
							
							
						}
						
						makeCubeObj.full = data.result.cubeobj;
							view = new setView(makeCubeObj.full,3);
							makeCubeObj.left = makeCubeObj.full[0]
							makeCubeObj.front = makeCubeObj.full[1]
							makeCubeObj.right = makeCubeObj.full[2]
							makeCubeObj.back = makeCubeObj.full[3]
							makeCubeObj.upper = makeCubeObj.full[4]
							makeCubeObj.down = makeCubeObj.full[5]
							
							cubeDiagram = new MakingCubeDiagram(makeCubeObj);
							moveCubeObj = new movingCube(makeCubeObj,3);
							moveController = new movingController(moveCubeObj);
							view.eraseAllmarkers();
							
						view.colorpainting();
						view.setmarker();
						parse.writehead();
						//parse.painterlast();
						parse.painterfirst();
						view.colorpainting();
						
						$('#lecturefield').append(
								'<div class="form-group" id="replyfield"></div>'+
								'<div class="form-group">'
				               + '<div class="col-sm-2">'
				               +  ' <label for="reply" class="control-label">comment</label>'
				               +' </div>'
				               +' <div class="col-sm-8">'
				               +'<input type="text" class="form-control" id="comment">'
				                 +'</div>'
				                +'<button class="btn btn-default" id="replycommit" value=""> commit'
				                +'</div>'
								//+'<input type="button" class="btn btn-default" id="'+data.result._id+'" value="modifycommit">' 
															
								
						)
						$('#replycommit').val(data.result._id);
						
						
						$.ajax({
							type:"post",
							url :"/showallreply",
							dataType:'json',
							data:{targetlecture :butid},
							success:function(data){
								
								var totalpage = Math.ceil((data.totpagenum)/5);

								if(data){
									console.log(data)
							for(var i=0;i<data.result.length;i++){
								$('#replyfield').prepend(
										
								'<span>'+data.result[i].comment+'&nbsp;&nbsp;&nbsp;&nbsp;'+data.result[i].nickname+'&nbsp;&nbsp;&nbsp;&nbsp;'+'</span>'
								
								
								)
								
							}
									$('#replyfield').append(
											'<tr id="pagefield">'
											
																	
									)		
									for(var i=0 ; i<totalpage;i++){
										$('#pagefield').append(
												'<td >'+
											'<button class="btn btn-default" id="replypagenums" value="'+butid+'">'+(i+1)
												+'</td>'
										)
										
									}
									$('#pagefield').append(
											
											
											+'</tr>'
											
									)				
									
								}
								
							}
						})		
			}
		}
		})
	})
$(document).on('click','#replycommit',function(){
	var butid = $(event.target).val();
	$.ajax({
		type:"post",
		url : '/writereply',
		dataType : 'json',
		data : {targetlecture: butid, comment : $('#comment').val()},
		success:function(data){
			if(data){
				//$('#lecturefield').empty();
				$.ajax({
					type:"post",
					url :"/showallreply",
					dataType:'json',
					data:{targetlecture :butid,page:0},
					success:function(data){
						$('#replyfield').empty();
						var totalpage = Math.ceil((data.totpagenum)/5);

						if(data){
							console.log(data)
					for(var i=0;i<data.result.length;i++){
						$('#replyfield').prepend(
								
						'<span>'+data.result[i].comment+'&nbsp;&nbsp;&nbsp;&nbsp;'+data.result[i].nickname+'&nbsp;&nbsp;&nbsp;&nbsp;'+'</span>'
						
						
						)
						
					}
					$('#replyfield').append(
							'<tr id="pagefield">'
							
													
					)		
					for(var i=0 ; i<totalpage;i++){
						$('#pagefield').append(
								'<td >'+
							'<button class="btn btn-default" id="replypagenums" value="'+butid+'">'+(i+1)
								+'</td>'
						)
						
					}
					$('#pagefield').append(
							
							
							+'</tr>'
							
					)			
							
						}
						
					}
				})		
						
				
				
			}
		}
	})
})
$(document).on('click','#replypagenums',function(){
	
	var butid = $(event.target).val();
	var pagnum = $(event.target).text()
	console.log(butid)
	
	pagenum = parseInt(pagnum)-1
	console.log(pagnum)
	console.log('페이지값'+butid)
	$.ajax({
		type:"post",
		url :"/showallreply",
		dataType:'json',
		data:{targetlecture :butid,page:pagenum},
		success:function(data){
			$('#replyfield').empty();
			var totalpage = Math.ceil((data.totpagenum)/5);

			if(data){
				console.log(data)
		for(var i=0;i<data.result.length;i++){
			$('#replyfield').prepend(
					
			'<span>'+data.result[i].comment+'&nbsp;&nbsp;&nbsp;&nbsp;'+data.result[i].nickname+'&nbsp;&nbsp;&nbsp;&nbsp;'+'</span>'
			
			
			)
			
		}
		$('#replyfield').append(
				'<tr id="pagefield">'
				
										
		)		
		for(var i=0 ; i<totalpage;i++){
			$('#pagefield').append(
					'<td >'+
				'<button class="btn btn-default" id="replypagenums" value="'+butid+'">'+(i+1)
					+'</td>'
			)
			
		}
		$('#pagefield').append(
				
				
				+'</tr>'
				
		)			
				
			}
			
		}
	})	
	
	
})





$(document).on('click','#recommend',function(){
	var butid = $(event.target).val();

	//console.log("BUTID"+butid)
	$.ajax({
		type:"post",
		url : '/recommendlecture',
		dataType : 'json',
		data : {id: butid},
		success:function(data){
			if(data){
				alert("추천 1 업!");
			}
		}
	})
})
$(document).on('click','#modifylectureform',function(){
	var butid = $(event.target).val();
	$.ajax({
	type:"post",
	url:'/searchlecture',
	dataType:'json',
	
	data:{id: butid},
	success:function(data){
		console.log(data.result.moves);
		$('#lecturefield').empty()
		$('#lecturefield').append(
			   '<div>'
	            +' <div>'
	            +'   <span class="header">글제목</span>'
	            +'    <span><input type="text" id="lecturetitle"></span>'
	            +'</div>'
	            +' <div >'
	            +'    <span class="header">글내용</span>'
	            +'    <span><textarea id="inputsc"></textarea></span>'
	            +'</div>'
	            +'</div>'
	            +'<div><span><input type="button" class="btn btn-defaul" id="inputbtn" value="시뮬레이터등록"></span></div>'
	            +'<button class="btn btn-default" id="modifylecture" value=""> 수정완료'
	            +'<div id="buttons"></div>'
	
	
	)
		$('#lecturetitle').val(data.result.title)
		$('#inputsc').val(data.result.contents)
		$('#modifylecture').val(data.result._id)
		//$('#modifyf2l').val(data.result._id)
	}
	})
})


$(document).on('click','#modifylecture',function(){
	var butid = $(event.target).val();
	$.ajax({
		type:"post",
		url:'/lecturemodify',
		dataType:'json',
		
		data:{id: butid,title :$('#lecturetitle').val(),contents:$('#inputsc').val()},
		success:function(data){
			if(data){
				$('#lecturefield').empty()
				$('#lecturefield').append(
						'<p>성공적으로 글이 수정되었습니다.</p>'		
						+'<input type="button" id="showlecturelist" value="목록으로">')
			}
		}
		
		
	})
	

})
$(document).on('click','#deletelecture',function(){
	var butid = $(event.target).val();
	$.ajax({
		type:"post",
		url:'/deletelecture',
		dataType:'json',
		
		data:{id: butid},
		success:function(data){
			$('#lecturefield').empty()
			$('#lecturefield').append(
						'<p>성공적으로 글이 삭제되었습니다.</p>'		
						+'<input type="button" id="showlecturelist" value="목록으로">')
			}
	})
})
$(document).on('click','#inputandfindbutt',function(){
	var whatfind = $('#inputandfind').val();
	$.ajax({
		type:"post",
		url:"/findsearch",
		dataType:'josn',
		data:{findthing : whatfind},
		success:function(data){
			$('#lecturefield').empty()
			for(var i=0;i<data.result.length;i++){

				
				$('#lecturefield').append(
						'<table>'+
						'<tr>'
						
						//'<button id="searchf2l" class="btn btn-default" value="'+data[i]._id.toString().valueOf()+'">'+data[i].moves
						//+'<button id="dorecommend" class="btn btn-default" value="'+data[i]._id.toString().valueOf()+'">추천'
						//+'<h2><a id="'+data[i]._id.toString().valueOf()+'">'+data[i].title+'</h2>'
						+'<button id="searchlecture" class="btn btn-default" value="'+data.result[i]._id.toString().valueOf()+'">'+data.result[i].title
						+'&nbsp;&nbsp;&nbsp;&nbsp;'
						+'</tr>'
						+'<h> 조회수 :'+data.result[i].view+'</h>'
						+'<h> 추천수 :'+data.result[i].recommend+'</h>'
						+'<h> 작성자 :'+data.result[i].nickname+'</h>'
						+'</table>'
						
				)
				
			}
		}
	})
})
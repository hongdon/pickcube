function Parser(){
		
	this.count=0;
	
} 

// 무브들을 입력하여 셋팅할때 파싱을하여 배열로 반환해주는 메서드 
Parser.prototype.parser = function(scr){
			console.log(scr);
			var splitarray = scr.split("");
			console.log(splitarray);
			var matching = new RegExp(/^[LFRBUDMSE]{1}$/);
			var matching2 = new RegExp(/^[lfrbud]{1}$/);
			var matching1 = new RegExp(/^[0-9]{1}$/);
			var totalarray=[];
			var boxarray = [];
			var commentarray=[];
			var commentstr="";
			for(var i =0; i<splitarray.length;i++){
			
				if(splitarray[i]==='['){
					delete splitarray[i];
					var index = splitarray.indexOf(']');
					for(var j=i+1;j<index;j++){
						commentstr = commentstr+splitarray[j];
						delete splitarray[j];
					}					
					delete splitarray[index];
					
					commentarray.push(commentstr);
					boxarray[i]=(commentarray.length-1).toString();
					
					commentstr="";
				}
				if(splitarray[i]==="↵"){
					commentarray.push("↵")
				}
			if(splitarray[i]!==undefined){
				if(splitarray[i]==='@'){
					 var result =splitarray[i];
					 
					 boxarray.push(result);
				}
				if(splitarray[i]==="↵"){
					commentarray.push("↵")
				}
				if(splitarray[i].match(matching)||splitarray[i].match(matching2)){
					console.log("들어오냐");
					 if(splitarray[i+1]==="2"){
						 var result=splitarray[i]+splitarray[i+1];
						 boxarray.push(result);
						
						
					 }else if(splitarray[i+1]==="'"){
						 
						 if(splitarray[i+2]==="2"){
							 console.log("asdgsadgjslkadjgklsdajgkl")
							  var result =splitarray[i]+splitarray[i+1]+splitarray[i+2];
							 boxarray.push(result);
						 }else{
							 var result=splitarray[i]+splitarray[i+1];
							 boxarray.push(result);
						 }
						 
						 
					 }
					 else{
						 var result =splitarray[i];
						 
						 boxarray.push(result);
					 }
				}
			}
			}
				
			totalarray[0]=boxarray;
			totalarray[1]=commentarray;
			console.log(commentarray);
			console.log(boxarray);
			
			return totalarray;
			
		}


//버튼으로 큐브를 조작하거나, 직접 입력으로 큐브를 조작할때 어떻게 움직였는지 화면 내 지정 영역에 표시해주는 메서드
Parser.prototype.writehead = function(){
	var strfield = document.getElementById("inputsctr");
	var s = document.createElement("td");
	/*s.textContent='start!'
	strfield.prepend(s);
	s.textContent='end!'
	strfield.append(s);*/
	$('#inputsctr').prepend('<span> start! </span>')
	
}
Parser.prototype.writeoperation = function(operation){
	var inputsctr = document.getElementById("inputsctr").getElementsByTagName("td");
	var index;
	/*var strfield = document.getElementById("inputsctr");
	//var table = document.getElementById("inputsctr");
	var matching1 = new RegExp(/^[0-9]{1}$/);
	var s= document.createElement("td");
	s.setAttribute('id','operationbox')
	//var c = document.createElement("h1");
	//if(!operation.match(matching1)){
		s.textContent = operation;
		strfield.appendChild(s);*/
/*		if(inputsctr.length===0){
			$('#inputsctr').append('<tr></tr>')
			index=0;
			inputsctr[index].
	//}
		}*/
		$('#inputsctr').append('<span>'+operation+'</span>')
		
	//$('#inputsctr').append('<td>'+operation+'</td>')
	//c.textContent = "ㅎㅇㅎㅇ";
	
	//strfield.appendChild(c);
	
	/*table.append('<td>start</td>')
	table.prepend('<td>end</td>')*/
		
}
Parser.prototype.writecomment = function(comment){
	console.log(comment);
	$('#commentfield').append(comment);
}
//지정 영역에 표시할 때 앞뒤로 왓다갔다 하기를 표시하기 위하여 맨 마지막에 색을 입히는 메서드 
Parser.prototype.painterfirst=function(){
	var inputsctr = document.getElementById("inputsctr").getElementsByTagName("span");
	//inputsctr.item(0).bgColor="#3DB7CC"
	inputsctr.item(0).style="background-color:#3DB7CC"	

}
Parser.prototype.painterlast = function(){
	var inputsctr = document.getElementById("inputsctr").getElementsByTagName("span");
	console.log(inputsctr)
	//inputsctr.item(inputsctr.length-1).bgColor="#3DB7CC"
	inputsctr.item(inputsctr.length-1).style.backgroundColor="#3DB7CC"	
		for(var i=0;i<inputsctr.length;i++){
			
			//if(inputsctr.item(i).bgColor!==""){
				if(inputsctr.item(i).style.backgroundColor!==""){
				//inputsctr.item(i).bgColor="";
				
				//inputsctr.item(inputsctr.length-1).bgColor="#3DB7CC"
					inputsctr.item(i).style.backgroundColor=""
					inputsctr.item(inputsctr.length-1).style.backgroundColor="#3DB7CC"
				
				
				break;
			}
			
	}	
	/*if(this.count===0){
		inputsctr.item(0).bgColor="#3DB7CC";
		this.count=1;
		console.log(this.count);
	}else{
	for(var i=0;i<inputsctr.length;i++){
		
		if(inputsctr.item(i).bgColor!==""){
			inputsctr.item(i).bgColor="";
			//if(inputsctr.item(i+1)){
				inputsctr.item(i+1).bgColor="#3DB7CC";
			//}
			
			break;
		}
		
}
	}*/
}

//지정 영역에 써있는 글자 전체를 지우는 메서드 
Parser.prototype.eraseoperation = function(){
	var strfield = document.getElementById("inputsctr");
	strfield.textContent = "";
	
}

// 위에 색 입력한 것을 커서로 삼아 커서를 앞으로 (오른쪽으로) 움직이는 메서드 
Parser.prototype.nextmovepointer = function(){
	var inputsctr = document.getElementById("inputsctr").getElementsByTagName("span");
	var nodes = document.getElementById("inputsctr");
	console.log(inputsctr.item(i).style)
	for(var i=0;i<inputsctr.length;i++){
		
		//if(inputsctr.item(i).bgColor!==""){
			if(inputsctr.item(i).style.backgroundColor!==""){
			try{
				inputsctr.item(i).style.backgroundColor=""
					inputsctr.item(i+1).style.backgroundColor="#3DB7CC"	
				//inputsctr.item(i).bgColor="";
				
				//inputsctr.item(i+1).bgColor="#3DB7CC";
				return i;
			}catch(e){
				console.log('에러')
				inputsctr.item(i).style.backgroundColor="#3DB7CC"
				//inputsctr.item(i).bgColor="#3DB7CC";
		
				
			}
				
			
			
			break;
				
			
			
		
		
		
	
		
}
}	
}
Parser.prototype.move = function(index){
	var inputsctr = document.getElementById("inputsctr").getElementsByTagName("span");
	
	return inputsctr.item(index).textContent;
}

//커서를 이동할 때 마다 반대 무브를 해야 원상태로 가기 때문에 반대 무브를 생성하는 메서드 
Parser.prototype.reversemove = function(index){
	
	
	var inputsctr = document.getElementById("inputsctr").getElementsByTagName("span");
	var operation = inputsctr.item(index).textContent;
	console.log(operation);
	var matching = new RegExp(/^[']{1}&/);
	
	if(operation.indexOf("'")){
		
		var splitarray = operation.split("");
		for(var i=0;i<splitarray.length;i++){
			
			if(splitarray[i+1]==="'"){
				delete splitarray[i+1];
				var result = splitarray.join("");
				return result;
				if(splitarray[i+2]==="2"){
					delete splitarray[i+1];
					var result = splitarray.join("");
					return result;
				}
			}
			if(splitarray[i+1]==="2"){
				splitarray[i+2]=splitarray[i+1];
				splitarray[i+1]="'";
				var result = splitarray.join("");
				return result;
			}
			else{
				splitarray[i+1]="'";
				var result = splitarray.join("");
				return result;
			}
			console.log('RESULT'+result);
		}
	}
}	

	
	
//커서를 뒤로 움직이는 .. 
Parser.prototype.movebeforepointer = function(){
	var inputsctr = document.getElementById("inputsctr").getElementsByTagName("span");
	var nodes = document.getElementById("inputsctr");
	console.log(inputsctr);
	for(var i=0;i<inputsctr.length;i++){
		
		//if(inputsctr.item(i).bgColor!==""){
		if(inputsctr.item(i).style.backgroundColor!==""){	
			try{
				//inputsctr.item(i).bgColor="";
				//inputsctr.item(i-1).bgColor="#3DB7CC";
				
				inputsctr.item(i).style.backgroundColor=""
				inputsctr.item(i-1).style.backgroundColor="#3DB7CC"
				return i;
				
			}catch(e){
				
					//inputsctr.item(i).bgColor="#3DB7CC";
				inputsctr.item(i).style.backgroundColor="#3DB7CC"
					
			}
			
				
				
				break;
			
			
		}
		
}
}


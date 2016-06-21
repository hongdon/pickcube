var emailcheck;
var nicknamecheck;

$(function(){
	
	$('#emailconfirm').click(function(){
		console.log('컨펌 오냐');
		
		var trimval = $.trim($('#email').val());
		console.log(trimval);
		var regExp = new RegExp(/^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/);
		var match = trimval.match(regExp);
		console.log(match);
		if(match===null){
			alert('please input valid email-form');
			$('#email').val('').focus();
			return false;
		}else{
			console.log('에이쟉스')
			$.ajax({
				
				type:"POST",
				url:'/checkID',
				dataType:'json',
				data:$('#joinform').serialize(),
				success:function(data){
					console.log(data);
					if(data===true){
						emailcheck='notchecked';
					alert('이미 있는 이메일입니다.');
					$('#email').val('').focus()
					
					}else{
					emailcheck='checked';
					alert('사용 가능한 이메일입니다.')
					
					}
					
				}
			});
		}
	});
	
});

$(function(){
	$('#nicknameconfirm').click(function(){
		var trimval = $.trim($('#nickname').val());
		if(trimval!==''){
			$.ajax({
				
				type:"POST",
				url:'/checkNickname',
				dataType:'json',
				data:$('#joinform').serialize(),
				success:function(data){
					console.log(data);
					if(data===true){
					nicknamecheck='notchecked';
					alert('이미 있는 닉네임입니다.');
					$('#nickname').val('').focus()	
					
					}else{
					nicknamecheck='checked';
					alert('사용 가능한 닉네임입니다.')
					
					}
					
				}
			});
		}else{
			alert('닉네임을 입력해주십시오.');
			$('#nickname').val('').focus()
		}
		
	})
	
})

function check() {
if(nicknamecheck==='checked'&&emailcheck ==='checked'){
	if($("#email").val()!=""){
		if($("#password").val()!=""){
			if($("#nickname").val()!=""){
								
				
			}else{
				alert('please valid nicname')
				return false;
			}
			
		}else{
			alert('please input password')
			return false;
		}
		
	}else{
		alert('please valid email')
		return false;
	}
}else{
	alert('pleas check joonbok');
	return false;
}
}

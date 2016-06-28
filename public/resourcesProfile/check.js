$(document).on('click','#imgupload',function(){
	
	$.ajax({
		type:"post",
		url:'/simpleupload',
		dataType:'json',
		
		data:{},
		success:function(data){
			
			console.log('오냐;')
			console.log(data)
			/*$('#lecturefield').empty()
			$('#lecturefield').append(
						'<p>성공적으로 글이 삭제되었습니다.</p>'		
						+'<input type="button" id="showlecturelist" value="목록으로">')
			*/
		}
	})
})



























function check() {
if($('#brand').val()!==""){
	if($('#name').val()!==""){
		if($('#cc').val()!==""){
			if($('#feel').val()!==""){
				if($('#price').val()!==""){
					if($('#goodorbad').val()!==""){
						
						$('#image').val($('#imageaddr').attr('src'))
					}else{
						alert('모든 칸을 다 입력해 주십시오')
						return false;
	
					}
				}else{
					alert('모든 칸을 다 입력해 주십시오')
					return false;

				}
			}else{
				alert('모든 칸을 다 입력해 주십시오')
				return false;

			}
		}else{
			alert('모든 칸을 다 입력해 주십시오')
			return false;

		}
	}else{
		alert('모든 칸을 다 입력해 주십시오')
		return false;

	}
	
	
	
}else{
	alert('모든 칸을 다 입력해 주십시오')
	return false;

}
}
$(document).on('click','#imgupload',function(){
	
	$.ajax({
		type:"post",
		url:'/simpleupload',
		dataType:'json',
		
		data:{},
		success:function(data){
			
			console.log('����;')
			console.log(data)
			/*$('#lecturefield').empty()
			$('#lecturefield').append(
						'<p>���������� ���� �����Ǿ����ϴ�.</p>'		
						+'<input type="button" id="showlecturelist" value="�������">')
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
						alert('��� ĭ�� �� �Է��� �ֽʽÿ�')
						return false;
	
					}
				}else{
					alert('��� ĭ�� �� �Է��� �ֽʽÿ�')
					return false;

				}
			}else{
				alert('��� ĭ�� �� �Է��� �ֽʽÿ�')
				return false;

			}
		}else{
			alert('��� ĭ�� �� �Է��� �ֽʽÿ�')
			return false;

		}
	}else{
		alert('��� ĭ�� �� �Է��� �ֽʽÿ�')
		return false;

	}
	
	
	
}else{
	alert('��� ĭ�� �� �Է��� �ֽʽÿ�')
	return false;

}
}
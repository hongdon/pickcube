function check() {
if($('#brand').val()!==""){
	if($('#name').val()!==""){
		if($('#cc').val()!==""){
			if($('#feel').val()!==""){
				if($('#price').val()!==""){
					if($('#goodorbad').val()!==""){
						
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
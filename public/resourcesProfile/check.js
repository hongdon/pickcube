function check() {
if($('#brand').val()!==""){
	if($('#name').val()!==""){
		if($('#cc').val()!==""){
			if($('#feel').val()!==""){
				if($('#price').val()!==""){
					if($('#goodorbad').val()!==""){
						
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
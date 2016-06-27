$(document).ready(function(){
	
	
	
	$.ajax({
		
		type:"POST",
		url:'/findeverylecture',
		dataType:'json',
		data:{},
		success:function(data){
		
			for(var i=0;i<data.length;i++){
				if(data[i].recommend<11){
					console.log(data[i].recommend)
					$('#field').append(
							
					'<div style="float:left;border-top:1px solid;border-bottom:1px solid;border-left:1px solid;border-right:1px solid; background-color:#FAED7D;width:150px;height:100px">'
					+'<a id="'+data[i]._id+'">'+data[i].title+
					'<p>'+data[i].nickname
					)
				}
				if(data[i].recommend<21 && data[i].recommend>10){
					console.log(data[i].recommend)

					$('#field').append(
							
					'<div style="float:left;border-top:1px solid;border-bottom:1px solid;border-left:1px solid;border-right:1px solid; background-color:#5CD1E5;width:250px;height:200px">'
							+'<a id="'+data[i]._id+'">'+data[i].title+
							'<p>'+data[i].nickname			
					)
				}
				if(data[i].recommend<31&&data[i].recommend>20){
					console.log(data[i].recommend)

					$('#field').append(
							
					'<div style="float:left;border-top:1px solid;border-bottom:1px solid;border-left:1px solid;border-right:1px solid; background-color:#A566FF;width:350px;height:300px">'
							+'<a id="'+data[i]._id+'">'+data[i].title+
							'<p>'+data[i].nickname
					)
				}
				if(data[i].recommend>30){
					console.log(data[i].recommend)

					$('#field').append(
							
			'<div style="float:left;border-top:1px solid;border-bottom:1px solid;border-left:1px solid;border-right:1px solid; background-color:#F15F5F;width:450px;height:400px">'
							+'<a id="'+data[i]._id+'">'+data[i].title+
							'<p>'+data[i].nickname
					)
				}
			}
			
		}
	});
	$('#field').load('lecture.jade')
})

$(document).on('click','a',function(){
	var vaule = $(event.target).attr('id');
var id = new setid(vaule)
console.log(id)
location.href='/lecture/?id='+vaule	
	
	
})
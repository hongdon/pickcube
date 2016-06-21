var dao = require('dao');
var service = module.exports={
	
	joinformcheck : function(req,res){
		dao.joinformcheck.on('end',function(err,result,sess){
			if(result){
				res.send('<script>alert("회원가입 실패")</script>')
			}else{
				console.log(sess);
				res.render('index',{session : sess})
			}
		})
	}
	
}
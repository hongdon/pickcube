
/*
 * GET home page.
 */

var dao = require('../dao');
var daoCFOP	= require('../daoCFOP');
var daolecture = require('../daolecture');
exports.index = function(req, res){
	
	console.log(req.session);
	res.render('index', { tittle : 'Express',session:req.session});	
};
exports.simulator=function(req,res){
	res.render('simulator',{session : req.session})
}
exports.lecture=function(req,res){
	res.render('lecture',{session:req.session})
}
exports.wiki = function(req,res){
	console.log(req.session);
	
	res.render('wiki',{title:'Express',session:req.session});
	
}
exports.join = function(req,res){
	console.log(req.body);
	console.log('joinsession'+req.session)
	var data ={nickname : req.body.nickname	,email: req.body.email,password:req.body.password}
	var resultquery=dao.joinformcheck(data);
	
	resultquery.on('joinfinish',function(err,result){
		if(err){
			console.log('joinfinisherror'+err)
			console.log('joinfinish'+result);
		}
		
		if(result===true){
			var sess = req.session
			sess.email = req.body.email;
			sess.logined = true;
			sess.nickname =req.body.nickname;
			console.log(sess);
			res.render('join-success',{session:sess})
			
		}else{
			req.session.logined= false;
			//res.send('<script>alert("회원가입 실패")</script>')
			res.render('join-fail',{session:req.session})
		}
	})
}
exports.joinform=function(req,res){
	res.render('join-form',{title:'Express',session:req.session});
	
}
exports.checkid=function(req,res){
	dao.hasEmail(req.body,res);
} 
exports.checknickname=function(req,res){
	dao.hasNickname(req.body,res);
}
exports.loginform = function(req,res){

	res.render('login-form',{title:'Express',session:req.session});
	
	
}
exports.login= function(req,res){
	var data ={email : req.body.email,password:req.body.password};
	
	var resultquery=dao.loginformcheck(data);
	resultquery.on('logincomplete',function(err,result){
		if(result){
			var sess = req.session
			sess.email = req.body.email;
			sess.logined = true;
			sess.nickname =result.nickname;
			console.log(sess);
			res.render('join-success',{session:sess})
		}else{
			req.session.logined= false;
			//res.send('<script>alert("회원가입 실패")</script>')
			res.render('join-fail',{session:req.session})
		}
	})
}
exports.info=function(req,res){
	var data = {email:req.session.email};
	var resultquery=dao.getinfo(data);
	resultquery.on('getinfo',function(err,result){
		console.log(result)
		if(result){
			res.render('information',{email : result.email,nickname:result.nickname,password : result.password,session:req.session});

		}
		else{
			
		}
	});
}
exports.modifyinfo=function(req,res){
	console.log(req.body);
	console.log('joinsession'+req.session)
	var data ={target : req.session.email, nickname : req.body.nickname	,email: req.body.email,password:req.body.password}
	var resultquery = dao.modifyinfo(data);
	resultquery.on('finishmodify',function(err,result){
		if(result){
			req.session.email = data.email;
			req.session.nickname= data.nickname;
			req.session.logined=true;
			res.render('modify-success',{session:req.session});
		}
		else{
			res.render('modify-fail',{session:req.session});
		}
	})
	
	
}

exports.deleteinfo=function(req,res){
	var data={target : req.session.email};
	var resultquery = dao.deleteinfo(data);
	resultquery.on('finishdelete',function(err,result){
		if(result){
			req.session.email="";
			req.session.nickname="";
			req.session.logined=false;
			res.render('modify-success',{session:req.session})
		}
		else{
			res.render('modify-fail',{session:req.session})
		}
	})
}
exports.logout= function(req,res){
	
	//req.session.destroy();
	req.session.logined=false;
	req.session.email="";
	req.session.nickname="";
	res.render('index',{session:req.session})
}
//--------------------------------------------------------------------------------------------회원가입 끝
//-----------------------------------------------------------공식 사전 시작---------------------------------------------------


exports.dictionaryform=function(req,res){
	res.render('dictionary-form',{session:req.session});
}
exports.dictionaryf2l=function(req,res){
	res.render('dictionaryf2l',{session:req.session});
}
exports.searchf2l = function(req,res){
	//console.log(req.body);
	//daoCFOP.searchf2l(req.body,res);
	console.log('PARAM123')
	//console.log(req.query.id);
	daoCFOP.findf2l(req.body,res);
	//daoCFOP.searchf2l(req.body,req, res)
	/*resultqueryf2l.on('insertf2l',function(err,result){
		
	})*/
}
exports.getonesearchf2l=function(req,res){
	console.log('PARAM')
	console.log(req.query.id);
	//var obj = 'ObjectId("'+req.query.id+'")';
	
	
	var queryresult = daoCFOP.findf2lbyId(req.body.id,req, res);
/*queryresult.on('findf2lbyId',function(err,result){
		if(result){
			res.render('find-by-id-result',{session : req.session, cubeobj:result.cubeobj,moves:result.moves,comment:result.comment})
		}
	})*/
}
exports.dictionaryorientation=function(req,res){
	res.render('dictionaryOrientation',{session:req.session})
}
exports.dictionarypermutation=function(req,res){
	res.render('dictionaryPermutation',{session:req.session})
}
/*exports.writef2lform=function(req,res){
	res.render('dictionary-f2l-write-form',{session:req.session})
}*/
exports.writef2l=function(req,res){
	console.log(req.body);
	daoCFOP.writef2l(req.body,req,res)
}
exports.recommendupf = function(req,res){
	console.log(req.body.id);
	daoCFOP.recommendUpf(req.body.id,res)
}
exports.modifyf2l=function(req,res){

	daoCFOP.modifyf2l(req, res)
}
exports.deletef2l=function(req,res){

	daoCFOP.deletef2l(req, res);
}
exports.f2lpage=function(req,res){
	daoCFOP.pagef2l(req,res);
}


exports.searchOri=function(req,res){
	daoCFOP.findOri(req.body, res);
}
exports.writeOri=function(req,res){
	daoCFOP.writeOri(req.body, req, res)
}
exports.getonesearchOri=function(req,res){
	daoCFOP.findOribyId(req.body.id,req, res)

}
exports.modifyori=function(req,res){

	daoCFOP.modifyori(req, res)
}
exports.deleteori=function(req,res){

	daoCFOP.deleteori(req, res);
}
exports.recommendupo = function(req,res){
	console.log(req.body.id);
	daoCFOP.recommendUpo(req.body.id,res)
}


exports.searchper=function(req,res){
	daoCFOP.findper(req.body, res)
}
exports.writeper=function(req,res){
	daoCFOP.writeper(req.body, req, res)
}
exports.getonesearchper=function(req,res){
	daoCFOP.findperbyId(req.body.id,req, res)
}
exports.recommendupp = function(req,res){
	console.log(req.body.id);
	daoCFOP.recommendUpp(req.body.id, res)
}
exports.modifyper=function(req,res){

	daoCFOP.modifyper(req, res)
}
exports.deleteper=function(req,res){

	daoCFOP.deleteper(req, res);
}

//////////////////////////////////-------------------강의 CRUD 라우팅 시작----------------------------------

exports.writelecture=function(req,res){
	daolecture.writelecture(req, res);
}
exports.showlecturelist=function(req,res){
	daolecture.showlecturelist(req, res);
}
exports.getonelecture=function(req,res){
	daolecture.findlecturebyId(req, res);
}
exports.modifylecture=function(req,res){
	daolecture.modifylecture(req, res);
}
exports.deletelecture=function(req,res){
	daolecture.deletelecture(req, res);
}
exports.recommendlecture=function(req,res){
	daolecture.recommendlecture(req, res);
}


exports.writereply=function(req,res){
	daolecture.writereply(req,res);
}
exports.showallreply=function(req,res){
	daolecture.showallreply(req,res);
}
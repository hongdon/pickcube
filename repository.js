var Mongolian = require('mongolian')
,server = new Mongolian
,db=server.db('PICKTHECUBE')
,users=db.collection('members')
,session = require('express-session'),
idchecked, nicknamechecked;

var mongoUtil = module.exports ={
		insertUser : function(req,res){
				var isSuccess
				users.insert({
					email:req.body.email,
					nickname:req.body.nickname,
					password : req.body.password
				},function(err,result){
					if(err){
						throw err;
					}
					var sess = req.session
					sess.email = result.email;
					sess.logined = true;
					sess.nickname = result.nickname
					
					//user.session.email=email;
					/*res.render('layout',{
						
						session : user.session
					})*/
						
						res.render('index',{title:'Express',session:sess})	
					
					
				});
			
			
			
		},
		joinformcheck:function(req,res){
			users.findOne({'$or':[{'nickname':req.body.nickname},{'email':req.body.email}]},function(err,result){
				if(err){
					throw err;
				}
				if(idchecked===true&&nicknamechecked===true){
					res.render('layout',{
						
						session : req.session
					})
					res.render('join-form',{title:'Express'});
					
					res.send('<script>alert("회원가입 실패")</script>')
				}
				else{
					mongoUtil.insertUser(req,res);
				}
				
			})
		},
		loginformcheck:function(req,res){
			users.findOne({'$and':[{'email':req.body.email},{'password':req.body.password}]},function(err,result){
				console.log('??????????????????fghfghfh?????????????');
				
				if(result){
					var sess = req.session
					sess.email = result.email;
					sess.logined = true;
					sess.nickname = result.nickname
					console.log('sess'+sess.email);
					
					res.render('index',{session : sess})
					res.send('<script>alert("로그인성공")</script>')
					
					
				}else{
					
					sess.logined = false;
					
					res.render('login-fail',{title:'Express',session:sess})
					
					
				}
			})
		},
		hasEmail : function(req,res){
			users.findOne({'email':req.email},function(err,result){
				if(err){
					throw err;
				}
				if(result){
					res.send(true);
					idchecked=true;	
				}
				else{
					res.send(false);
					idchecked=false;
				}
			});
		},
		hasNickname : function(req,res){
			users.findOne({'nickname':req.nickname},function(err,result){
				if(err){
					throw err;
				}
				if(result){
					res.send(true);
					nicknamechecked=true;
				}
				else{
					res.send(false);
					nicknamechecked=false;
				}
			})
		}

};
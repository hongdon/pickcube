﻿
var Mongolian = require('mongolian')
//,server = new Mongolian
//,db=server.db('PICKTHECUBE');

//if(process.env.MONGO_URL) {
,db = new Mongolian("mongodb://hongdon:rjsgml8911@ds021434.mlab.com:21434/heroku_4hps7b82")
	
	//} else {
	//  server = new Mongolian;
	db.auth('hongdon','rjsgml8911')  
	//}
var users=db.collection('members')
,session = require('express-session'),
idchecked, nicknamechecked,
EventEmitter=require('events').EventEmitter,
evt = new EventEmitter();


var dao = module.exports={
	/*	insertUser : function(req,res){
			
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
				evt.emit('end',err,result);
			});
			
			return evt;
		},*/
		deleteinfo : function(data){
			users.remove({'email':data.target},
				/*{
			     justOne: true,
			    
				},*/
				function(err,result){
					if(result){
						evt.emit('finishdelete',err,true);
					}else{
						evt.emit('finishdelete',err,false);
					}
				});
			return evt;
		},
		modifyinfo : function(data){
			
			users.findAndModify({
				query : {email:data.target},
				update:  {email:data.email,nickname:data.nickname,password:data.password }}
				,function(err,result){
				console.log(result)
				if(err){
					throw err;
				}
				if(result){
					evt.emit('finishmodify',err,result);
				}else{
					console.log('fail');
				}
			});
		return evt;
		},
		getinfo : function(data){
			console.log(data);
			console.log('여기까지오냐dfgdgdg');
			users.findOne({'email':data.email},function(err,result){
				if(err){
					throw err;
				}
				if(result){
					console.log(result);
					evt.emit('getinfo',err,result);
				}
				else{
					console.log('fail');
				}
				
			})
			return evt;
		},
		loginformcheck:function(data){
			users.findOne({'$and':[{'email':data.email},{'password':data.password}]},function(err,post){
				console.log('??????????????????fghfghfh?????????????');
				console.log("gagsgfff"+result);
				if(err){
					console.log(err);
				}
				if(post){
					
					evt.emit('logincomplete',err,result);
					
				}else{
					
										
					evt.emit('logincomplete',err,false);
					
				}
			})
			return evt;
		},
		joinformcheck:function(data){
			users.insert({
				email:data.email,
				nickname:data.nickname,
				password : data.password
			},function(err,result){
				console.log('insert'+result);
				if(err){
					console.log('inserterror'+err)
				}
				evt.emit('joinfinish',err,true);
			});
			
			return evt;
			
			
			
		},
		hasEmail : function(req,res){
			users.findOne({'email':req.email},function(err,result){
				if(err){
					console.log(err);
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
					console.log(err);
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
}
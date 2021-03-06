﻿
//var Mongolian = require('mongolian')
var mongoose = require('mongoose')
mongoose.connect("mongodb://hongdon:rjsgml8911@ds021751.mlab.com:21751/pickthecube")
var db = mongoose.connection;
db.once("open",function () {
	  console.log("DB connected!");
	});
	db.on("error",function (err) {
	  console.log("DB ERROR :", err);
	});
	var Schema = mongoose.Schema
	//var db = new Mongolian(process.env.MONGODB_URI)
	var dataSchema = new Schema({
		email : {type:String,required:true, unique:true},
		nickname : {type:String,required:true,unique:true},
		password : {type:String, required:true},
		Joindate : {type:Date}
	})	
	var Data = mongoose.model('members',dataSchema);
	
//var users = db.collection('members')
var session = require('express-session'),
idchecked, nicknamechecked,
EventEmitter=require('events').EventEmitter,
evt = new EventEmitter();
//console.log("MEMBERS"+db);

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
			Data.remove({email:data.target},
					
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
			
			Data.findAndModify({
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
			Data.findOne({email:data.email},function(err,result){
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
			/*Data.findOne().and([{email:data.email},{password:data.password}],function(err,result){
				console.log('??????????????????fghfghfh?????????????');
				console.log("gagsgfff"+result);
				if(err){
					console.log(err);
				}
				if(result){
					
					evt.emit('logincomplete',err,result);
					
				}else{
					
										
					evt.emit('logincomplete',err,false);
					
				}
			})
			return evt;*/
			
			Data.findOne({$and:[{email:data.email},{password:data.password}]},function(err,result){
				console.log('??????????????????fghfghfh?????????????');
				console.log("gagsgfff"+result);
				if(err){
					console.log(err);
				}
				if(result){
					
					evt.emit('logincomplete',err,result);
					
				}else{
					
										
					evt.emit('logincomplete',err,false);
					
				}
			})
			return evt;
		},
		joinformcheck:function(data){
			console.log("계속 도나?")
			var newData = new Data();
			newData.email =data.email;
			newData.nickname = data.nickname;
			newData.password = data.password;
			/*Data.save({
				email:data.email,
				nickname:data.nickname,
				password : data.password},function(err,result){
				console.log('insert'+result);
				if(err){
					console.log('inserterror'+err)
				}
				evt.emit('joinfinish',err,true);
				
			});*/
			newData.save(function(err,result){
				if(err){
					console.log(err)
				}
				evt.emit('joinfinish',err,true);
			})
			return evt;
			
			
			
		},
		hasEmail : function(req,res){
			Data.findOne({email:req.email},function(err,result){
				if(err){
					console.log(err);
				}else if(result===undefined){
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
			Data.findOne({nickname:req.nickname},function(err,result){
				if(err){
					console.log(err);
				}else if(result===undefined){
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
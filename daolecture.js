var Mongolian = require('mongolian')
,server = new Mongolian
,db=server.db('PICKTHECUBE')

,lecture=db.collection('lecture')
,reply =db.collection('replylecture')

var daolecture = module.exports = {
	
	writelecture : function(req,res){
		
		
		lecture.insert({
			
			title : req.body.title,
			contents : req.body.contents,
			nickname : req.session.nickname,
			cubeObj : req.body.cubeObj,
			date : new Date(),
			view : 0,
			recommend : 0,
			unrecommend :0
			
		},function(err,result){
			
			if(err){
				throw err;
			}
			if(result){
				res.send(true);
			}
		})
	},
	showlecturelist : function(req,res){
		console.log('showlecturelist')
	var totalpage;
		lecture.find({}).count(function(err,cursor){
			totalpage=cursor;
		})
		lecture.find({}).sort({date : -1}).limit(5).skip(req.body.page * 5).toArray(function(err,cursor){
			
			if(err){
				throw err;
			}
			console.log(cursor);
			if(cursor){
				
				
				//console.log(typeof cursor[0]._id.toString().valueOf());
				
				for(var i=0;i<cursor.length;i++){
					console.log(typeof cursor[i]._id)
					console.log(cursor[i]._id)
					console.log('아뒤아뒤')
					if(cursor[i]._id){
						cursor[i]._id = cursor[i]._id.toString().valueOf()
					}
					
					/*if(cursor[i]===undefined){
						res.send(false);
						break;
					}*/
					
				}
				res.send({result : cursor, totpagenum : totalpage});
			}
		})
		
	},
	findlecturebyId : function(req,res){
		
		console.log('data:'+req.body.id);
		//console.log(data.charAt(1));
		
		var resss = new Buffer(req.body.id,'hex')
		
		var ObjectId =  require('mongolian').ObjectId
		ObjectId = new ObjectId(resss);
	
	
		console.log(ObjectId)
	
		lecture.findOne({"_id":ObjectId},function(err,result){
			if(err){
				throw err;
			}
			if(result){
				daolecture.viewsUp(req.body.id,res);

				console.log('RESULTTTTTTTTTTTTTTTTTT')
				console.log(result);
				/*evt.emit('findf2lbyId',err,result);*/
				result._id =result._id.toString().valueOf() 
				res.send({result : result,session:req.session});
			}
		})
		/*return evt;*/
	

},
viewsUp : function(data,res){
	
	var resss = new Buffer(data,'hex')
	var ObjectId =  require('mongolian').ObjectId
	ObjectId = new ObjectId(resss);
	
	lecture.findAndModify({
		query : {_id:ObjectId},
		update : {$inc : {view : 1}}
		},function(err,result){
		if(err){
			throw err;
		}
		if(result){
			console.log('view up!')
		}
	})
},
recommendlecture : function(req,res){
	//console.log(data);
	var resss = new Buffer(req.body.id,'hex')
	var ObjectId =  require('mongolian').ObjectId
	
	ObjectId = new ObjectId(resss);
	
	
	lecture.findAndModify({
		query : {_id:ObjectId},
		update : {$inc : {recommend : 1}}
		},function(err,result){
		if(err){
			throw err;
		}
		if(result){
			console.log('recommend up!')
			res.send(true);
		}
	})
},
modifylecture : function(req,res){
	console.log('수정 오니');
	var resss = new Buffer(req.body.id,'hex')
	var ObjectId =  require('mongolian').ObjectId
	
	ObjectId = new ObjectId(resss);
	lecture.findAndModify({
		query :{_id:ObjectId},
		update : {$set:{title:req.body.title,contents:req.body.contents}}
	},function(err,result){
		if(err){
			throw err;
		}
		if(result){
			console.log('수정 up!')

			res.send(true);
		}
	})
},
deletelecture : function(req,res){
	console.log('수정 오니');
	var resss = new Buffer(req.body.id,'hex')
	var ObjectId =  require('mongolian').ObjectId
	
	ObjectId = new ObjectId(resss);
	lecture.findAndModify({
		query :{_id:ObjectId},
		remove : true
	},function(err,result){
		if(err){
			throw err;
		}
		if(result){
			res.send(true)
		}
	})
},

writereply : function(req,res){
	reply.insert({
		
		//title : req.body.title,
		comment : req.body.comment,
		nickname : req.session.nickname,
		//cubeObj : req.body.cubeObj,
		date : new Date(),
		target : req.body.targetlecture
		
	},function(err,result){
		if(err){
			throw err;
		}
		if(result){
			res.send(true);
		}
	})
},
showallreply:function(req,res){
	
	var totalpage;
	reply.find({}).count(function(err,cursor){
		totalpage=cursor;
	})
	reply.find({target:req.body.targetlecture}).sort({date : -1}).limit(5).skip(req.body.page * 5).toArray(function(err,cursor){
		
		if(err){
			throw err;
		}
		console.log(cursor);
		if(cursor){
			
			
			//console.log(typeof cursor[0]._id.toString().valueOf());
			
			for(var i=0;i<cursor.length;i++){
				console.log(typeof cursor[i]._id)
				console.log(cursor[i]._id)
				console.log('아뒤아뒤')
				if(cursor[i]._id){
					cursor[i]._id = cursor[i]._id.toString().valueOf()
				}
				
				/*if(cursor[i]===undefined){
					res.send(false);
					break;
				}*/
				
			}
			res.send({result : cursor, totpagenum : totalpage});
		}
	})
}
	
}
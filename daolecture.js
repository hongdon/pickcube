/*var Mongolian = require('mongolian')
,server = new Mongolian
,db=server.db('PICKTHECUBE')

,lecture=db.collection('lecture')
,reply =db.collection('replylecture')*/
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
		title : String,
		contents : String,
		nickname:String,
		cubeobj : Schema.Types.Mixed,
		date : Date,
		view : Number,
		recommend : Number
	})	
	var replySchema = new Schema({
		comment : String,
		nickname : String,
		date : Date,
		target : String
	})
	var lecture = mongoose.model('lecture',dataSchema);
	var reply = mongoose.model('reply',dataSchema);
var daolecture = module.exports = {
	
	writelecture : function(req,res){
		var newData = new lecture();
		newData.title = req.body.title,
		newData.contents = req.body.contents,
		newData.nickname = req.session.nickname,
		newData.cubeobj = req.body.cubeObj,
		newData.view = 0,
		newData.recommend =0
		/*lecture.insert({
			
			title : req.body.title,
			contents : req.body.contents,
			nickname : req.session.nickname,
			cubeObj : req.body.cubeObj,
			date : new Date(),
			view : 0,
			recommend : 0,
			
			
		}*/newData.save(function(err,result){
			
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
		lecture.find({}).sort({date : -1}).limit(5).skip(req.body.page * 5).exec(function(err,cursor){
			
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
		console.log(resss);
		//var ObjectId =  require('mongolian').ObjectId
		var ObjectId = require('mongoose').Types.ObjectId
		objectId = new ObjectId(req.body.id);
	
	
		console.log(objectId)
	
		lecture.findOne({"_id":objectId},function(err,result){
			if(err){
				throw err;
			}
			if(result){
				daolecture.viewsUp(objectId,res);

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
	
/*	console.log('data:'+req.body.id);
	//console.log(data.charAt(1));
	
	var resss = new Buffer(req.body.id,'hex')
	console.log(resss);
	//var ObjectId =  require('mongolian').ObjectId
	var ObjectId = require('mongoose').Types.ObjectId
	objectId = new ObjectId(req.body.id);*/


	/*console.log(objectId)*/

	lecture.findOneAndUpdate({
		query : {_id:data},
		update : {$inc : {view : 1}}
		},function(err,result){
		if(err){
			throw err;
		}
		if(result){
			console.log('view up!')
		}
	})
	/*lecture.findAndModify({
		query : {_id:ObjectId},
		update : {$inc : {view : 1}}
		},function(err,result){
		if(err){
			throw err;
		}
		if(result){
			console.log('view up!')
		}
	})*/
},
recommendlecture : function(req,res){
	console.log('data:'+req.body.id);
	//console.log(data.charAt(1));
	
	var resss = new Buffer(req.body.id,'hex')
	console.log(resss);
	//var ObjectId =  require('mongolian').ObjectId
	var ObjectId = require('mongoose').Types.ObjectId
	objectId = new ObjectId(req.body.id);


	console.log(objectId)

	
	
	lecture.findOneAndUpdate({
		query : {_id:objectId},
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
	console.log('data:'+req.body.id);
	//console.log(data.charAt(1));
	
	var resss = new Buffer(req.body.id,'hex')
	console.log(resss);
	//var ObjectId =  require('mongolian').ObjectId
	var ObjectId = require('mongoose').Types.ObjectId
	objectId = new ObjectId(req.body.id);


	console.log(objectId)

	//ObjectId = new ObjectId(resss);
	lecture.findOneAndUpdate({
		query :{_id:objectId},
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
	console.log('data:'+req.body.id);
	//console.log(data.charAt(1));
	
	var resss = new Buffer(req.body.id,'hex')
	
	//var ObjectId =  require('mongolian').ObjectId
	var ObjectId = new mongoose.Types.ObjectId(resss)
	//ObjectId = new ObjectId(resss);
	ObjectId = new ObjectId(resss);
	lecture.findOneAndRemove({
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
	
	var newData = new reply();
	newData.comment = req.body.comment
	newData.nickname = req.session.nickname
	target : req.body.targetlecture
	
	newData.save(function(err,result){
		if(err){
			throw err;
		}
		if(result){
			res.send(true);
		}
	})
	/*reply.insert({
		
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
	})*/
},
showallreply:function(req,res){
	
	var totalpage;
	reply.find({}).count(function(err,cursor){
		totalpage=cursor;
	})
	reply.find({target:req.body.targetlecture}).sort({date : -1}).limit(5).skip(req.body.page * 5).exec(function(err,cursor){
		
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
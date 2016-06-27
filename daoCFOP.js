//var Mongolian = require('mongolian')
//,server = new Mongolian
//,db=server.db('PICKTHECUBE')
var mongoose = require('mongoose')
mongoose.connect("mongodb://hongdon:rjsgml8911@ds021751.mlab.com:21751/pickthecube")
var db = mongoose.connection;
db.once("open",function () {
	  console.log("DB connected!");
	});
	db.on("error",function (err) {
	  console.log("DB ERROR :", err);
	});
	/**/
	var Schema = mongoose.Schema
	//var db = new Mongolian(process.env.MONGODB_URI)
	var cubicle = new Schema({
		face : String,
		index : String,
		marked : String,
		color : String
	})
	var face = new Schema({
		facearray :[cubicle,cubicle,cubicle,cubicle,cubicle,cubicle,cubicle,cubicle,cubicle]
	})
	var cube = new Schema({
		cube : [face,face,face,face,face,face]
	})
	
	var dataSchema = new Schema({
		
		cubeobj : Schema.Types.Mixed,
		//cubeobj : {face :String,index:String,color:String,marked:String},
		//cubeobj : Array,
		cubeobjcode : String,
		moves : String,
		view : Number,
		recommend :Number,
		comment : String,
		nickname : String,
		date : Date
		
	})	
	dataSchema.set('toObject', { getters: true });
	var f2ldic = mongoose.model('f2ldic',dataSchema);
	var oridic = mongoose.model('oridic',dataSchema);
	var perdic = mongoose.model('perdic',dataSchema);
/*var usersf=db.collection('cubeobjf2l')
,userso=db.collection('cubeobjorientation')
,usersp=db.collection('cubeobjpermutation')*/
var session = require('express-session'),
idchecked, nicknamechecked,
EventEmitter=require('events').EventEmitter,
evt = new EventEmitter();

var daoCFOP = module.exports={
		
		writef2l :function(data,req,res){
			console.log('WRITTTTTE!')
			console.log(data.cubeObj)
			var newData = new f2ldic();
			var cubeobjcode="";
			for(var i=0;i<data.cubeobj.length;i++){
				for(var j=0;j<data.cubeobj[i].length;j++){
					/*newData.cubeobj[i][j].face = data.cubeobj[i][j].face
					newData.cubeobj[i][j].index =data.cubeobj[i][j].index
					newData.cubeobj[i][j].color =data.cubeobj[i][j].color
					newData.cubeobj[i][j].marked =data.cubeobj[i][j].marked*/
					cubeobjcode=cubeobjcode+data.cubeobj[i][j].color;
							
				}
			}
			newData.cubeobj = data.cubeobj,
			
			newData.cubeobjcode = cubeobjcode,
			newData.moves = data.moves,
			newData.view = 0,
			newData.recommend =0,
			newData.comment = data.comment,
			newData.nickname = req.session.nickname
			
			newData.save(function(err,result){
				if(err){
					throw err;
				}
				
				if(result){
				res.send(true);
				}
			})
			/*usersf.insert({
				cubeobj : data.cubeobj,
				moves : data.moves,
				view :0,
				recommend: 0,
				comment : data.comment,
				nickname:req.session.nickname,
				email:req.session.email,
				date :new Date(),
			},function(err,result){
				if(err){
					throw err;
				}
				
				if(result){
				res.send(true);
				}
			})*/
			
			//return evt;
		},
		writeOri :function(data,req,res){
			console.log('WRITTTTTE!')
			console.log(data.cubeObj)
			userso.insert({
				cubeobj : data.cubeobj,
				moves : data.moves,
				view : 0,
				recommend:0,
				comment : data.comment,
				nickname:req.session.nickname,
				email:req.session.email,
				date :new Date(),
			},function(err,result){
				if(err){
					throw err;
				}
				
				if(result){
				res.send(true);
				}
			})
			
			//return evt;
		},
		writeper :function(data,req,res){
			console.log('WRITTTTTE!')
			console.log(data.cubeObj)
			usersp.insert({
				cubeobj : data.cubeobj,
				moves : data.moves,
				view : 0,
				recommend:0,
				comment : data.comment,
				nickname:req.session.nickname,
				email:req.session.email,
				date :new Date(),
			},function(err,result){
				if(err){
					throw err;
				}
				
				if(result){
				res.send(true);
				}
			})
			
			//return evt;
		},
		findf2l : function(data,res){
			//console.log('daoCFOP!')
			//console.log(data.cubeObj); 
			var totalpage;
			/*console.log(data.cubeObj);
			var cubeObj1 = require('mongoose').Schema.Types.Mixed
			var cubeObj2 = new cubeObj1(data.cubeObj)
			f2ldic.find({cubeobj:cubeObj2},function(err,results){
				console.log("없냐??")
				console.log(results)
				
				//var result = results[0].cubeobj=data.cubeobj?true:false;
				//console.log(result)
				//console.log(results[1].cubeobj[1])
			})
			f2ldic.aggregate().match({cubeobj : data.cubeObj}).exec(function(err,response){
				if(err) console.log(err);
				
				console.log("어그리게이트")
				console.log(response)
			})
			*/
			var cubeobjcode="";
			for(var i=0;i<data.cubeobj.length;i++){
				for(var j=0;j<data.cubeobj[i].length;j++){
					
					cubeobjcode=cubeobjcode+data.cubeobj[i][j].color;
							
				}
			}
			//var cubeObj1 = require('mongoose').Schema.Types.Array
			//var cubeObj2 = new Array(data.cubeObj)
					//console.log(cubeObj2);
			/*f2ldic.find({cubeobj:cubeObj2},function(err,results){
				console.log("없냐??")
				console.log(results)
				
				//var result = results[0].cubeobj=data.cubeobj?true:false;
				//console.log(result)
				//console.log(results[1].cubeobj[1])
			})*/
			f2ldic.find({cubeobjcode:cubeobjcode}).count(function(err,results){
				//console.log('asfsafsdfsadfsdgsadg');
				console.log(results);
				totalpage = results;
			})
			f2ldic.find({cubeobjcode:cubeobjcode}).limit(5).skip(data.page * 5).sort({view : -1}).exec(function(err, results) {
				if(err){
					console.log(err);
				}
				console.log('CURSOR'+results);
				if(results){
					console.log('result 들어오냐');
					
					//console.log(typeof cursor[0]._id.toString().valueOf());
					
					for(var i=0;i<results.length;i++){
						console.log(typeof results[i]._id)
						console.log(results[i]._id)
						console.log('아뒤아뒤')
						if(cursor[i]._id){
							cursor[i]._id = results[i]._id.toString().valueOf()
						}
						
						if(cursor[i]===undefined){
							res.send(false);
							break;
						}
						
					}
					res.send({result : results, totpagenum : totalpage})
				}
			})
			
		},
		findOri : function(data,res){
			var totalpage;
			console.log('daoCFOP!')
			console.log(data.cubeObj); 
			userso.find({'cubeobj':data.cubeObj}).count(function(err,cursor){
				console.log('asfsafsdfsadfsdgsadg');
				console.log(cursor);
				totalpage = cursor;
			})
			userso.find({'cubeobj' : data.cubeObj}).sort({view : -1}).limit(5).skip(data.page * 5).toArray(function(err, cursor) {
				if(err){
					throw err;
				}
				console.log(cursor);
				if(cursor){
					console.log('result 들어오냐');
					
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
					res.send({result : cursor, totpagenum : totalpage})
				}
			})
			
		},
		findper : function(data,res){
			console.log('daoCFOP!')
			console.log(data.cubeObj); 
			var totalpage;
			usersp.find({'cubeobj':data.cubeObj}).count(function(err,cursor){
				console.log('asfsafsdfsadfsdgsadg');
				console.log(cursor);
				totalpage = cursor;
			})
			usersp.find({'cubeobj' : data.cubeObj}).sort({view : -1}).limit(5).skip(data.page * 5).toArray(function(err, cursor) {
				if(err){
					throw err;
				}
				console.log(cursor);
				if(cursor){
					console.log('result 들어오냐');
					
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
					res.send({result : cursor, totpagenum : totalpage})
				}
			})
			
		},
		findf2lbyId : function(data,req,res){
			
			console.log('data:'+data);
			console.log(data.charAt(1));
			
			var resss = new Buffer(data,'hex')
			
			var ObjectId =  require('mongolian').ObjectId
			ObjectId = new ObjectId(resss);
		
		
			console.log(ObjectId)
		
			f2ldic.findOne({"_id":ObjectId},function(err,result){
				if(err){
					throw err;
				}
				if(result){
					daoCFOP.viewsUpF(data,res);

					console.log('RESULTTTTTTTTTTTTTTTTTT')
					console.log(result);
					/*evt.emit('findf2lbyId',err,result);*/
					result._id =result._id.toString().valueOf() 
					res.send({result : result,session:req.session});
				}
			})
			/*return evt;*/
		

},

findOribyId : function(data,req,res){
	console.log('data:'+data);
	console.log(data.charAt(1));
	
	
	var resss = new Buffer(data,'hex')
	
	var ObjectId =  require('mongolian').ObjectId
	ObjectId = new ObjectId(resss);


	console.log(ObjectId)

	userso.findOne({"_id":ObjectId},function(err,result){
		if(err){
			throw err;
		}
		if(result){
			console.log('RESULTTTTTTTTTTTTTTTTTT')
			console.log(result);
			daoCFOP.viewsUpO(data,res);

			/*evt.emit('findf2lbyId',err,result);*/
			result._id =result._id.toString().valueOf() 
			res.send({result : result,session:req.session});
			}
	})


},
findperbyId : function(data,req,res){
	console.log('data:'+data);
	console.log(data.charAt(1));
	
	
	var resss = new Buffer(data,'hex')
	
	var ObjectId =  require('mongolian').ObjectId
	ObjectId = new ObjectId(resss);


	console.log(ObjectId)

	usersp.findOne({"_id":ObjectId},function(err,result){
		if(err){
			throw err;
		}
		if(result){
			console.log('RESULTTTTTTTTTTTTTTTTTT')
			console.log(result);
			daoCFOP.viewsUpP(data,res);

			/*evt.emit('findf2lbyId',err,result);*/
			result._id =result._id.toString().valueOf() 
			res.send({result : result,session:req.session});
	
		}
	})
	/*return evt;*/
},
viewsUpF : function(data,res){
	var resss = new Buffer(data,'hex')
	var ObjectId =  require('mongolian').ObjectId
	ObjectId = new ObjectId(resss);
	
	f2ldic.findAndModify({
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
viewsUpO : function(data,res){
	var resss = new Buffer(data,'hex')
	var ObjectId =  require('mongolian').ObjectId
	ObjectId = new ObjectId(resss);
	
	userso.findAndModify({
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
viewsUpP : function(data,res){
	var resss = new Buffer(data,'hex')
	var ObjectId =  require('mongolian').ObjectId
	ObjectId = new ObjectId(resss);
	
	usersp.findAndModify({
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
recommendUpf : function(data,res){
	console.log(data);
	var resss = new Buffer(data,'hex')
	var ObjectId =  require('mongolian').ObjectId
	
	ObjectId = new ObjectId(resss);
	
	
	f2ldic.findAndModify({
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
recommendUpo : function(data,res){
	console.log(data);
	var resss = new Buffer(data,'hex')
	var ObjectId =  require('mongolian').ObjectId
	
	ObjectId = new ObjectId(resss);
	
	
	userso.findAndModify({
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
recommendUpp : function(data,res){
	console.log(data);
	var resss = new Buffer(data,'hex')
	var ObjectId =  require('mongolian').ObjectId
	
	ObjectId = new ObjectId(resss);
	
	
	usersp.findAndModify({
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
modifyf2l : function(req,res){
	console.log('수정 오니');
	var resss = new Buffer(req.body.id,'hex')
	var ObjectId =  require('mongolian').ObjectId
	
	ObjectId = new ObjectId(resss);
	f2ldic.findAndModify({
		query :{_id:ObjectId},
		update : {$set:{moves:req.body.moves,comment:req.body.comment}}
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
deletef2l : function(req,res){
	console.log('수정 오니');
	var resss = new Buffer(req.body.id,'hex')
	var ObjectId =  require('mongolian').ObjectId
	
	ObjectId = new ObjectId(resss);
	usersf.findAndModify({
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
modifyori : function(req,res){
	console.log('수정 오니');
	var resss = new Buffer(req.body.id,'hex')
	var ObjectId =  require('mongolian').ObjectId
	
	ObjectId = new ObjectId(resss);
	userso.findAndModify({
		query :{_id:ObjectId},
		update : {$set:{moves:req.body.moves,comment:req.body.comment}}
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
deleteori : function(req,res){
	console.log('수정 오니FFFF');
	var resss = new Buffer(req.body.id,'hex')
	var ObjectId =  require('mongolian').ObjectId
	
	ObjectId = new ObjectId(resss);
	userso.findAndModify({
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
modifyper : function(req,res){
	console.log('수정 오니');
	var resss = new Buffer(req.body.id,'hex')
	var ObjectId =  require('mongolian').ObjectId
	
	ObjectId = new ObjectId(resss);
	usersp.findAndModify({
		query :{_id:ObjectId},
		update : {$set:{moves:req.body.moves,comment:req.body.comment}}
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
deleteper : function(req,res){
	console.log('수정 오니');
	var resss = new Buffer(req.body.id,'hex')
	var ObjectId =  require('mongolian').ObjectId
	
	ObjectId = new ObjectId(resss);
	usersp.findAndModify({
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
pagef2l : function(req,res){
	var pagenum = req.query.page;
	var pageresult = pagenum * 5
	
}
}

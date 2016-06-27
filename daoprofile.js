var mongoose = require('mongoose')
mongoose.connect("mongodb://hongdon:rjsgml8911@ds021751.mlab.com:21751/pickthecube")
var db = mongoose.connection;
db.once("open",function () {
	  console.log("DB connected!");
	});
	db.on("error",function (err) {
	  console.log("DB ERROR :", err);
	});
	var session = require('express-session'),
	EventEmitter=require('events').EventEmitter,
	evt = new EventEmitter();
var Schema = mongoose.Schema
var dataSchema = new Schema({
	brand : String,
	name : String,
	cc : String,
	rotatefeeling : String,
	price : String,
	goodorbad : String,
	nickname : String,
	date : Date
})

var profile = mongoose.model('profile',dataSchema);

var daoprofile = module.exports = {
		profilewrite : function(req,res){
			var newData = new profile();
			newData.brand = req.body.title
			newData.name = req.body.name
			newData.cc = req.body.cc
			newData.rotatefeeling = req.body.feel
			newData.price = req.body.price
			newData.goodorbad = req.body.goodorbad
			newData.nickname = req.session.nickname
		newData.save(function(err,result){
			if(err){
				throw err;
			}if(result){
				evt.emit('finishwrite',err,true)
			}
		})
			
		return evt	;
			
		},
		profilelist : function(req,res){
			profile.find({}).count(function(err,cursor){})
			profile.find({}).sort({date : -1}).limit(5).skip(req.body.page * 5).exec(function(err,cursor){
				
				if(err){
					throw err;
				}
				console.log(cursor);
				if(cursor){
				
					for(var i=0;i<cursor.length;i++){
						console.log(typeof cursor[i]._id)
						console.log(cursor[i]._id)
						console.log('아뒤아뒤')
						if(cursor[i]._id){
							cursor[i]._id = cursor[i]._id.toString().valueOf()
						}
					}
						
					
			}
				evt.emit('finishsearching',err,cursor)
				
			})

			
			
			return evt;
			//res.render('profilelist',{result : cursor,session:session})
		}
}
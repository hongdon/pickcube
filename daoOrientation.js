var Mongolian = require('mongolian')
,server = new Mongolian
,db=server.db('PICKTHECUBE')
,users=db.collection('cubeobjf2l')
,session = require('express-session'),
idchecked, nicknamechecked,
EventEmitter=require('events').EventEmitter,
evt = new EventEmitter();

var daoOrientation = module.exports={
		
		
}
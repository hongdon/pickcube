
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path')
   ,cookieParser = require('cookie-parser')
  ,session = require('express-session'),
 /* flash = require('connect-flash'),
  passport = require('passport'),
  async = require('async'),*/
  sessionvar;

  /*,redis = require('redis')
  ,redisStore = require('connect-redis')(session)
  ,client = redis.createClient();*/
var app = express();
//var router = express.Router();
//var MemStore = express.session.MemoryStore;
// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
//app.set('OperationDictionary',__dirname+'/views/OperationDictionary');
app.set('view engine', 'jade');

app.use(express.favicon());
app.use(express.logger('dev'));

app.use(express.methodOverride());
app.use(cookieParser());
app.use(session({secret: '@#@$MYSIGN#@$#$',
	/* store: new redisStore({
         host: "127.0.0.1",
         port: 6379,
         client: client,
         prefix : "session:",
         db : 0
     })*/
	 resave: false,
	 saveUninitialized: true,
	
	  cookie: {
		   // secure: true
		   /* ,expires: false*/
		  }
	 }));

/*passport.serializerUser(function(user,done){
	done(null,user.id);
});
passport.deserializeUser(function(id,done){
	
})*/
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.bodyParser());
/*app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
*/

/*app.use('/',function(req,res){
	output={};
	output.cookies = req.cookies;
	output.session = req.session;
	console.log('output'+output);
	next(req.session);
})
*/
// development onlyess
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

var upload = require('multiparty');
app.use(upload);

/*app.get('/',function(req,res){
	session = req.session;
	console.log('session123123'+session)
	res.json(session)
})*/
app.get('/', routes.index);
app.get('/simulator',routes.simulator);
app.get('/lecture',routes.lecture)
app.get('/users', user.list);
app.get('/wiki',routes.wiki);
app.get('/join',routes.joinform);
app.post('/join',routes.join);
app.post('/checkID',routes.checkid);
app.post('/checkNickname',routes.checknickname);
app.get('/login',routes.loginform);
app.post('/login',routes.login);
app.get('/info',routes.info);
app.post('/modifyinfo',routes.modifyinfo);
app.get('/deleteinfo',routes.deleteinfo);
app.get('/logout',routes.logout);

//-----------------------------회원가입 라우팅 중료, 로그아웃만 추가하면됨
//-----------------------------딕셔너리 라우팅 시작
app.get('/dictionaryform',routes.dictionaryform);
app.get('/f2l',routes.dictionaryf2l);
app.get('/orientation',routes.dictionaryorientation);
app.get('/permutation',routes.dictionarypermutation)
//app.post('/searchorientation',routes.searchorientation);
//app.get('/searchpermutation',routes.dictionarypermutation);
//app.post('/searchpermutation',routes.searchpermutation);
app.post('/searchf2l',routes.searchf2l);
app.post('//f2ldictionary/:page?',routes.f2lpage);
//app.get('/searchf2l/:id?',routes.getonesearchf2l);
app.post('/searchf2lbyid',routes.getonesearchf2l);
//app.get('/writenewf2l',routes.writef2lform);
app.post('/writef2l',routes.writef2l);
app.post('/recommendupf',routes.recommendupf);
app.post('/modifyf2l',routes.modifyf2l);
app.post('/deletef2l',routes.deletef2l);

app.post('/searchOri',routes.searchOri);
app.post('/writeOri',routes.writeOri);
app.post('/searchOribyId',routes.getonesearchOri);
app.post('/recommendupo',routes.recommendupo);
app.post('/modifyori',routes.modifyori);
app.post('/deleteori',routes.deleteori);

app.post('/searchper',routes.searchper);
app.post('/writeper',routes.writeper);
app.post('/searchperbyId',routes.getonesearchper);
app.post('/recommendupp',routes.recommendupp);
app.post('/modifyper',routes.modifyper);
app.post('/deleteper',routes.deleteper);
////////////////////////강의 CRUD

app.post('/writelecture',routes.writelecture)
app.post('/showlecturelist',routes.showlecturelist);
app.post('/searchlecture',routes.getonelecture)
app.post('/recommendlecture',routes.recommendlecture);
app.post('/lecturemodify',routes.modifylecture);
app.post('/deletelecture',routes.deletelecture);
app.post('/searchlecturebynickname',routes.searchlecturebynickname);

app.post('/writereply',routes.writereply);
app.post('/showallreply',routes.showallreply);
app.post('/findsearch',routes.findsearch)

app.get('/cubedic',routes.cubedic);
app.get('/cubeprofilewriteform',routes.cubeprofilewriteform);
app.post('/profilewrite',routes.profilewrite);
app.get('/profilelist',routes.profilelist);
app.get('/searchprofile/:brand?',routes.searchprofile)

app.get('/monthlycube',routes.monthlycube);
app.post('/findeverylecture',routes.findeverylecture);




router.post('/imageupload', function(req, res, next) {
 
      var form = new multiparty.Form();
     
      // get field name & value
      form.on('field',function(name,value){
           console.log('normal field / name = '+name+' , value = '+value);
      });
     
      // file upload handling
      form.on('part',function(part){
           var filename;
           var size;
           if (part.filename) {
                 filename = part.filename;
                 size = part.byteCount;
           }else{
                 part.resume();
          
           }    
 
           console.log("Write Streaming file :"+filename);
           var writeStream = fs.createWriteStream('/images/'+filename);
           writeStream.filename = filename;
           part.pipe(writeStream);
 
           part.on('data',function(chunk){
                 console.log(filename+' read '+chunk.length + 'bytes');
           });
          
           part.on('end',function(){
                 console.log(filename+' Part read complete');
                 writeStream.end();
           });
      });
 
      // all uploads are completed
      form.on('close',function(){
           res.status(200).send('Upload complete');
      });
     
      // track progress
      form.on('progress',function(byteRead,byteExpected){
           //console.log(' Reading total  '+byteRead+'/'+byteExpected);
    	  res.send(true);
      });
     
      form.parse(req);
 
 
});
http.createServer(app).listen(app.get('port'), function(){
	  console.log('Express server listening on port ' + app.get('port'));
});

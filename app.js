var express		=	require('express');
var path		=	require('path');
var bodyParser	=	require('body-parser');
var mysql 		= 	require('mysql');
var io 			= 	require('socket.io');
var session 		= 	require('express-session')
var cookieParser 	= 	require('cookie-parser')
var app				=	express();
app.use(cookieParser())

var db 			=	require('./config/db.js');
var con 		= 	mysql.createConnection(db);

con.connect();

app.use(bodyParser());
app.use(session({secret: 'ssshhhhh'}));

// app.use(express.static('public'));
app.use(express.static(path.join(__dirname, 'controllers')));
app.use(express.static(path.join(__dirname, 'models')));
app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
// app.set('public', path.join(__dirname, 'public'));

// route our app
// var router = require('./config/routes');
// app.use('/', router);
// var sess;
app.get('/login', function(req, res) {
	res.render('login');
})

app.post('/login', function(req, res) {
	var phone	=	req.body.phone;
	var sql 	=	"SELECT * FROM tb_user WHERE user_id = ?";
	con.query(sql, [phone], function (err, result, fields) {
	    if (err) throw err;
	    if (result.length != 0 && result[0].user_id !== '') {
	    	res.cookie('userCookie', result[0].user_id)
			return res.redirect('/chat');
		}
		res.redirect('/login');
	});
});

app.get('/chat', function(req, res) {
	var phone_login	=	req.cookies['userCookie'];
	var sql 		= "SELECT * FROM tb_user " + 
					"LEFT JOIN tb_message ON (user_id = user_own) " + 
					"WHERE NOT user_id = ?"; 
	var params 	=	[phone_login];
	if (typeof phone_login !== 'undefined') {
		con.query(sql, params, function (err, result, fields) {
		    if (err) throw err;
		    obj = removeDuplicates(result, 'user_id')
			res.render('chat', {
				phones 	: obj,
				user 	: phone_login
			});	
		});
	} else {
		return res.redirect('/login');
	}
})

app.get('/phones', function(req, res) {
	var phone_login	=	req.cookies['userCookie'];
	var sql 		= "SELECT * FROM tb_user LEFT JOIN tb_message ON (user_id = user_own) WHERE NOT user_id = ?";
	con.query(sql, [phone_login], function (err, result, fields) {
	    if (err) throw err;
	    // console.log(result)
	    console.log(req.cookies['userCookie'])
	    obj = removeDuplicates(result, 'user_id')
		// console.log(obj)					
		res.render('phone', {
			phones : obj,
			phone : 	phone_login
		});
	});
});

app.get('/message/:phoneId', function(req, res) {
	var phone 		=	req.params.phoneId;
	var phone_login	=	req.cookies['userCookie'];
	var sql = 'SELECT * FROM tb_message WHERE (user_own = ? OR user_own = ?) AND (user_receive = ? OR user_receive = ?)';
	con.query(sql, [phone_login, phone, phone, phone_login], function (err, result, fields) {
	    if (err) throw err;
		res.render('message', {
			mess 			: result,
			user_own 		: phone_login,
			user_receive	: phone
		});
	});
});

function removeDuplicates(originalArray, prop) {
     var newArray = [];
     var lookupObject  = {};

     for(var i in originalArray) {
        lookupObject[originalArray[i][prop]] = originalArray[i];
     }

     for(i in lookupObject) {
         newArray.push(lookupObject[i]);
     }
      return newArray;
 }

// app.listen(8081, function() {
// 	console.log('Hello express');
// });
// io.listen(app.listen(8081));
var io = require('socket.io').listen(app.listen(8081));
// khởi tạo kết nối socket
io.sockets.on('connection', function(socket) {
	socket.broadcast.emit('hi');
    // socket.emit('chat message', { message: 'welcome to the chat' });
	socket.on('chat message', function(data){
		var values = [[data.user_own, data.user_receive, data.msg]];
		var sql = "INSERT INTO tb_message (user_own, user_receive, content) VALUES ?";
		con.query(sql, [values], function (err, result) {
    		if (err) throw err;
    		// console.log("Number of records inserted: " + result.affectedRows);
  		});
		io.emit('received message', data.msg, data.user_own, data.user_receive);
	});

	socket.on('load message', function(data) {
		var sql 	= "SELECT * FROM tb_message " + 
					"WHERE (user_own = ? OR user_own = ?) " + 
					"AND (user_receive = ? OR user_receive = ?)";
		var params 	= [data.user, data.contact, data.contact, data.user];
		con.query(sql, params, function (err, result) {
    		if (err) throw err;
			io.emit('pass message', result, data.user);
  		});
	});
});
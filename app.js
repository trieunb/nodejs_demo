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
	var phone_login	=	req.cookies['userCookie'];
	if (typeof phone_login !== 'undefined') {
		var sql = "UPDATE tb_user SET is_login = '0' WHERE user_id = ?";
    	con.query(sql, [phone_login], function(err, result) {
    		if (err) throw err;
    	});
    	res.clearCookie("userCookie");
	}
	res.render('login', {
			msg_error : ''
		});
})

app.post('/login', function(req, res) {
	var phone	=	req.body.phone;
	var sql 	=	"SELECT * FROM tb_user WHERE user_id = ?";
	con.query(sql, [phone], function (err, result, fields) {
	    if (err) throw err;
	    console.log(result);
	    if (result.length != 0 && result[0].user_id !== '') {
	    	var sql = "UPDATE tb_user SET is_login = '1' WHERE user_id = ?";
	    	con.query(sql, [result[0].user_id], function(err, result) {
	    		if (err) throw err;
	    	});
	    	res.cookie('userCookie', result[0].user_id);
	    	// res.cookie('statusCookie', result[0].status);
			return res.redirect('/chat');
		}
		res.render('login', {
			msg_error : 'Username incorrect'
		});
	});
});

app.post('/register', function(req, res) {
	var userName = req.body.username;
	console.log(userName);
	if (userName == '') {
		return res.send({
				res 		: false, 
				msg_success : "Username is not empty"
			});
	}
	var sql = "INSERT INTO tb_user (user_id, name) VALUES ?"
	var values = [[userName, 'no name']];
	con.query(sql, [values], function(err, result) {
		if (err) {
			// throw err;
			res.send({
				res 		: false, 
				msg_success : "Username is already in use. Please choose another one."
			});
		} else {
			console.log(result);
			res.send({
				res 		: true, 
				unsername 	: req.body.username,
				msg_success : "Register Successful"
			});
		}
	});
});

app.get('/chat', function(req, res) {
	var phone_login	=	req.cookies['userCookie'];
	var sql 		= "SELECT * FROM tb_user " + 
					"LEFT JOIN tb_message ON (user_id = user_own) "; 
					// "WHERE NOT user_id = ?"; 
	var params 	=	[phone_login];
	if (typeof phone_login !== 'undefined') {
		con.query(sql, params, function (err, result, fields) {
		    if (err) throw err;
		    var sql = "UPDATE tb_user SET is_login = '1' WHERE user_id = ?";
	    	con.query(sql, [phone_login], function(err, result) {
	    		if (err) throw err;
	    	});
		    obj 	= removeDuplicates(result, 'user_id')
		    user 	= getUserLogin(result, phone_login);
		    // console.log(user);
			res.render('chat', {
				phones 	: obj,
				user 	: phone_login,
				status 	: user.status
			});	
		});
	} else {
		var sql = "UPDATE tb_user SET is_login = '0' WHERE user_id = ?";
    	con.query(sql, params, function(err, result) {
    		if (err) throw err;
    	});
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

function getUserLogin(userLists, user) {
	var user_login = {};
	for (var i in userLists) {
		if (userLists[i]['user_id'] == user) {
			user_login	=	userLists[i]; 
		}
	}
	return user_login;
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
	//load content message chat
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
	//change status for user login
	socket.on('change status', function(data) {
		var sql = "UPDATE tb_user SET status = ? WHERE user_id = ?; SELECT * FROM tb_user WHERE user_id = ?";
		var params = [data.status, data.user, data.user];
		con.query(sql, params, function (err, result) {
    		if (err) throw err;
    		var is_login = result[1][0].is_login;
    		io.emit('pass status', data, is_login)
  		});
	});
	//logout
	socket.on('user logout', function(data) {
		var sql = "UPDATE tb_user SET is_login = 0 WHERE user_id = ?; SELECT * FROM tb_user WHERE user_id = ?";
		var params = [data.user, data.user];
		con.query(sql, params, function (err, result) {
    		if (err) throw err;
    		var is_login = result[1][0].is_login;
    		io.emit('pass status', data, is_login)
  		});
	});
});
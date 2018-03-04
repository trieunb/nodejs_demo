var express		=	require('express');
var path		=	require('path');
var bodyParser	=	require('body-parser');
var mysql 		= 	require('mysql');
var events = require('events');
var eventEmitter = new events.EventEmitter();

var db 			=	require('./config/db.js');
var con 		= 	mysql.createConnection(db);

con.connect();

var app			=	express();

app.use(bodyParser());
// app.use(express.static('public'));
app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
// app.set('public', path.join(__dirname, 'public'));

// route our app
// var router = require('./config/routes');
// app.use('/', router);

app.get('/login', function(req, res) {
	res.render('login');
	// res.send('hello, express');
})

app.post('/login', function(req, res) {
	var phone	=	req.body.phone;
	console.log(phone);
	if (phone !== '') {
		res.redirect('/phones');
	}
	res.redirect('/login');
})

app.get('/phones', function(req, res) {
	con.query("SELECT * FROM tb_user", function (err, result, fields) {
	    if (err) throw err;
	    console.log(result);
		var phones = [
			{user_id : '01649214266'},
			{user_id : '0905242897'}
		];
		res.render('phone', {
			phones : result
		});
	});
});

app.get('/message/:phoneId', function(req, res) {
	var phone 	=	req.params.phoneId;
	console.log(phone)
	res.render('message', {
		phone : phone
	});
});

app.listen(8081, function() {
	console.log('Hello express');
});
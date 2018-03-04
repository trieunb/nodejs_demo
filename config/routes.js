// require express
var express 	= 	require('express');
var bodyParser	=	require('body-parser');
var path    	= 	require('path');
var app			=	express();

var mysql 		= 	require('mysql');
var db 			=	require('db');
var con 		= 	mysql.createConnection(db);

con.connect();

// create our router object
var router = express.Router();

// export our router
module.exports = router;

app.use(bodyParser());
// app.use(express.static('public'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'config')));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

router.get('/login', function(req, res) {
	res.render('login');
	// res.send('hello, express');
})

router.post('/login', function(req, res) {
	var phone	=	req.body.phone;
	console.log(phone);
	res.redirect('/phones');
})

router.get('/phones', function(req, res) {
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

router.get('/message/:phoneId', function(req, res) {
	var phone 	=	req.params.phoneId;
	console.log(phone)
	res.render('message', {
		phone : phone
	});
});

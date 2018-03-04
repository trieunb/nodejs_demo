var http 	= 	require("http");
var fs 		= 	require('fs');
var url 	= 	require('url');
var mysql 	= 	require('mysql');
var db 		=	require('./db.js');

http.createServer(function (request, response) {

   // Send the HTTP header 
   // HTTP Status: 200 : OK
   // Content Type: text/plain
   // Biến request: là biến lưu trữ thông tin gửi lên của client
    // Biến response: là biến lưu trữ các thông tin trả về cho client
     
    // Kiểm tra URL truy cập phải trang about ko
    if (request.url == '/login')
    {
        // Thiết lập Header
        response.writeHead(200, {
            "Context-type" : "text/html"
        });
         
        // Show thông tin trang about
        fs.createReadStream('./view/login.html').pipe(response);
    }
    else // trường hợp ngược lại ko tìm thấy file
    {
        // Thiết lập Header
        response.writeHead(404, {
            "Context-type" : "text/plain"
        });
         
        // Show lỗi không tìm thấy trang
        response.write('404 Not Found ' + request.url);
         
        // Kết thúc
        response.end();
    }
}).listen(8081);
// Console will print the message
console.log('Server running at http://127.0.0.1:8081/');
// Create connect database mysql
var con = mysql.createConnection(db);
con.connect(function(err) {
  if (err) throw err;
  con.query("SELECT * FROM tb_user", function (err, result, fields) {
    if (err) throw err;
    console.log(result);
  });
});
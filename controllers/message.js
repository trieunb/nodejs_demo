var socket = io();
$('form').submit(function() {
	var data =	{
		msg 			: 	$('#chat-box').val(),
		user_own		: 	$('.user-own').val(),
		user_receive	: 	$('.user-receive').val()
	};
  	socket.emit('chat message', data);
  	$('#chat-box').val('');
  	return false;
});
socket.on('received message', function(msg, phone_login, user_receive){
	var msg_class = '';
	if (phone_login == $('.user-own').val()) {
		msg_class = 'user_own';
	} else {
		msg_class = 'user_receive';
	}
  	$('#messages').append($('<li class="'+ msg_class +'">').text(msg));
});

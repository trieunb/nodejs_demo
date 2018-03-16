
var socket = io();

// $(".messages").animate({ scrollTop: $(document).height() }, "fast");
$(".messages").animate({ scrollTop: $('.messages').prop("scrollHeight")}, 1000);

$("#profile-img").click(function() {
  $("#status-options").toggleClass("active");
});

$(".expand-button").click(function() {
  $("#profile").toggleClass("expanded");
  $("#contacts").toggleClass("expanded");
});

$("#status-options ul li").click(function() {
  $("#profile-img").removeClass();
  $("#status-online").removeClass("active");
  $("#status-away").removeClass("active");
  $("#status-busy").removeClass("active");
  $("#status-offline").removeClass("active");
  $(this).addClass("active");
  
  if($("#status-online").hasClass("active")) {
    $("#profile-img").addClass("online");
  } else if ($("#status-away").hasClass("active")) {
    $("#profile-img").addClass("away");
  } else if ($("#status-busy").hasClass("active")) {
    $("#profile-img").addClass("busy");
  } else if ($("#status-offline").hasClass("active")) {
    $("#profile-img").addClass("offline");
  } else {
    $("#profile-img").removeClass();
  };
  
  $("#status-options").removeClass("active");
});

function newMessage() {
  message = $(".message-input input").val();
  if($.trim(message) == '') {
    return false;
  }

  var data =  {
    msg           :   message,
    user_own      :   $('#profile .wrap > p').text(),
    user_receive  :   $('li.active').find('.name').text()
  };
  socket.emit('chat message', data);
  $('.message-input input').val(null);
  // $('<li class="sent"><img src="http://emilcarlsson.se/assets/mikeross.png" alt="" /><p>' + message + '</p></li>').appendTo($('.messages ul'));
  // $('.contact.active .preview').html('<span>You: </span>' + message);
  $(".messages").animate({ scrollTop: $('.messages').prop("scrollHeight")}, 1000);
};

$('.submit').click(function() {
  newMessage();
});

$(window).on('keydown', function(e) {
  if (e.which == 13) {
    newMessage();
    return false;
  }
});

//load infor chat first
var contact = $('ul li.active').find('.name').text();
$('.contact-profile p').text(contact)
//active menu
$('#contacts > ul > li.contact').on('click', function(e) {
  var contact = $(this).find('.name').text();
  $('li.contact').removeClass('active');
  $(this).addClass('active');
  $('.contact-profile p').text(contact)

  var data =  {
    user      :   $('#profile .wrap > p').text(),
    contact   :   contact
  };
  socket.emit('load message', data);
  $(".messages").animate({ scrollTop: $('.messages').prop("scrollHeight")}, 1000);
  e.preventDefault();
});
socket.on('pass message', function(msg, user){
  // console.log(msg)
    // $('.messages ul').append($('<li class="sent">').text(msg));
    var html = '';
    for (var i = 0; i < msg.length; i++) {
      // console.log(msg[i]['user_own'])
      console.log(user)
      if (msg[i]['user_own'] == user) {
        html += '<li class="sent">'+
                  '<img src="http://emilcarlsson.se/assets/mikeross.png" alt="" />'+
                  '<p>'+msg[i]['content']+'</p>'+
                '</li>';
      } else {
        html += '<li class="replies">'+
                  '<img src="http://emilcarlsson.se/assets/mikeross.png" alt="" />'+
                  '<p>'+msg[i]['content']+'</p>'+
                '</li>';
      } 
    }
      
    $('.messages ul').html(html);
});

socket.on('received message', function(msg, phone_login, user_receive){
    var msg_class = '';
    if (phone_login == $('#profile .wrap > p').text()) {
      msg_class = 'sent';
    } else {
      msg_class = 'replies';
    }
    var html = '<li class="'+msg_class+'">'+
                  '<img src="http://emilcarlsson.se/assets/mikeross.png" alt="" />'+
                  '<p>'+msg+'</p>'+
                '</li>';
    $('.messages ul').append(html);
    $('.contact .pre_'+phone_login+'_'+user_receive+'').text(msg);
    $(".messages").animate({ scrollTop: $('.messages').prop("scrollHeight")}, 1000);
});
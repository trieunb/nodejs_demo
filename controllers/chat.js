
var socket = io();
changeStatus();
$("#input-chat").emojioneArea({
    pickerPosition: "top",
    filtersPosition: "bottom",
    tones: false,
    autocomplete: false,
    inline: true,
    hidePickerOnBlur: false
  });

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
    $("#profile-img").attr("data-status", 1);
  } else if ($("#status-away").hasClass("active")) {
    $("#profile-img").addClass("away");
    $("#profile-img").attr("data-status", 2);
  } else if ($("#status-busy").hasClass("active")) {
    $("#profile-img").addClass("busy");
    $("#profile-img").attr("data-status", 3);
  } else if ($("#status-offline").hasClass("active")) {
    $("#profile-img").addClass("offline");
    $("#profile-img").attr("data-status", 0);
  } else {
    $("#profile-img").removeClass();
  };
  
  $("#status-options").removeClass("active");
});

function newMessage() {
  message = $(".message-input #input-chat").val();
  if($.trim(message) == '') {
    return false;
  }

  var data =  {
    msg           :   message,
    user_own      :   $('#profile .wrap > p').text(),
    user_receive  :   $('li.active').find('.name').text()
  };
  socket.emit('chat message', data);
  $('.message-input #input-chat').val(null);
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
// var contact = $('ul li.active').find('.name').text();
// $('.contact-profile p').text(contact)
//active menu
$('#contacts > ul > li.contact').on('click', function(e) {
 $('.wrap-content').addClass('hidden'); 
 $('.content').removeClass('hidden'); 
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
                  '<img src="/images/no-avatar_1.png" alt="" />'+
                  '<p>'+msg[i]['content']+'</p>'+
                '</li>';
      } else {
        html += '<li class="replies">'+
                  '<img src="/images/no-avatar_1.png" alt="" />'+
                  '<p>'+msg[i]['content']+'</p>'+
                '</li>';
      } 
    }
      
    $('.messages ul').html(html);
});
//receive message
socket.on('received message', function(msg, phone_login, user_receive){
    var msg_class = '';
    if (phone_login == $('#profile .wrap > p').text()) {
      msg_class = 'sent';
    } else {
      msg_class = 'replies';
    }
    var html = '<li class="'+msg_class+'">'+
                  '<img src="/images/no-avatar_1.png" alt="" />'+
                  '<p>'+msg+'</p>'+
                '</li>';
    $('.messages ul').append(html);
    $('.contact .pre_'+phone_login+'_'+user_receive+'').text(msg);
    $(".messages").animate({ scrollTop: $('.messages').prop("scrollHeight")}, 1000);
});
//change status of user login
$('#status-options ul li').on('click', function() {
  var status = $(this).data('status');
  var user   = $('#profile .wrap > p').text();
  var data = {
    status  :   status,
    user    :   user
  };
  socket.emit('change status', data);
});
//logout
$('#logout').on('click', function() {
  var status = $('#profile-img').attr('data-status');
  var user   = $('#profile .wrap > p').text();
  var data = {
    status  :   status,
    user    :   user
  };
  // console.log(data);
  socket.emit('user logout', data);
  window.location.href = '/login';
});
//change status when have emit
socket.on('pass status', function(data, is_login) {
    var status = getStatus(data.status, is_login);
    console.log(status)
    if (data.user == $('#profile .wrap > p').text()) {
      $('#profile-img').addClass(status);
    } else {
      $('#contacts ul li').each(function() {
        if (data.user == $(this).find('.name').text()) {
          $(this).find('.contact-status').removeClass();
          $(this).find('.wrap span').addClass('contact-status '+status);
        }
      });
    }
});

function getStatus(status, is_login) {
  var class_status = 'offline';
  if(status == 1 && is_login == 1) {
    class_status = 'online';
  }
  if(status == 2 && is_login == 1) {
    class_status = 'away';
  }
  if(status == 3 && is_login == 1) {
    class_status = 'busy';
  }
  if(status == 0  && is_login == 1) {
    class_status = 'offline';
  }
  return class_status;
}
function changeStatus() {
  var status = $("#profile-img").attr('data-status');
  var user   = $('#profile .wrap > p').text();
  console.log(user);
  var data = {
    status  :   status,
    user    :   user
  };
  socket.emit('change status', data);
}
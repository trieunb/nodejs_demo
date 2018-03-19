 var socket = io();
 $(document).ready(function () {

    $('.forgot-pass').click(function(event) {
      $(".pr-wrap").toggleClass("show-pass-reset");
    }); 
    
    $('.pass-reset-submit').click(function(event) {
      $(".pr-wrap").removeClass("show-pass-reset");
    });

    $('#sign-up').on('click', function() {
    	var username = $('.username').val();
    	$.ajax({
                url: '/register',
                type: 'POST',
                dataType: 'json',
                data: {
                    username: username,
                },
                success: function(res) {
                	$('.title-error').text(res.msg_success);
                }
            });
    });
});

$(function(){


  /** TAPIR SEARCH SERVICE **/

  $('#search_results_pane #search_close').click(function(){
    $('#search_results_pane').slideUp();
    $('body').removeClass('search_active');
  });

  $('#searchform').submit(function() {
    $('#search_results').empty();
    var phrase = $('input#s').val();
    var token = '514602663f61b0121e0001fc';
    $('#search_results_pane span#search_phrase').html(phrase);

    $.getJSON(
      'http://tapirgo.com/api/1/search.json?token=' + token + '&query=' + phrase + '&callback=?', function(data){
        $.each(data, function(key, val) {
          $('#search_results').append('<li class="result"><a href="' + val.link + '">' + val.title + '</a></li>');
        });
        $('#single_sidebar').removeClass('fixed');
        $('body').addClass('search_active');
        $('#search_results_pane').slideDown();
      }
    );
    return false;
  });

	$('input#s').bind('blur', function(){
  		$(this).toggleClass("active");
  });
  $('input#s').bind('focus', function(){
  		$(this).toggleClass("active");
  });

	// Sidebar: Widgets is the page has a sidebar
  if($('body').hasClass('default') && !$('body').hasClass('search_active')){

    // Sidebar: Twitter Widget
    $.getJSON("https://api.twitter.com/1/statuses/user_timeline/superwillyfoc.json?count=5&include_rts=1&callback=?", function(data) {
      var output = '<ul>';
      for (var i=0; i < 5; i++){
        var tweet = data[i].text;
        output += '<li>';
        tweet = tweet.replace(/(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig, function(url) {
            return '<a href="'+url+'">'+url+'</a>';
        }).replace(/B@([_a-z0-9]+)/ig, function(reply) {
            return  reply.charAt(0)+'<a href="http://twitter.com/'+reply.substring(1)+'">'+reply.substring(1)+'</a>';
        });
        output += tweet;
        output += '</li>';
      }
      output += '</ul>';
      $("#twitter_feed").html(output);
    });

    // Sidebar: Instagram Widget
    $("#instagram_feed").instagram({
    	userId: '601339',
    	accessToken: '601339.21a96fe.1b1011db642c41aa9f540af0df06c5bc',
  		clientId: '21a96feb17014188a157c3978e360230', 
  		show: 4, 
  		image_size: 'low_resolution'
    });
  }

  // Sidebar positioning on scroll

  $(window).scroll(function() {
    if($(window).width() > 768){    
      var sidebar = $('#single_sidebar');
      var scroll_trigger = $('#header_container').height();
      scroll_trigger = scroll_trigger + $('.single .post_header').height() + 100;

      var window_width = $(window).width();
      var main_width = $('#main').width();
      var sidebar_right = (window_width - main_width)/2;
      
      if ($(this).scrollTop() > scroll_trigger) {
        sidebar.addClass("fixed");
        sidebar.css('top', '40px');
        sidebar.css('right', parseInt(sidebar_right +1));
      } else {
        sidebar.removeClass("fixed");
        sidebar.css('top', 'auto');
        sidebar.css('right', 'auto');
      }
    }
  });

});
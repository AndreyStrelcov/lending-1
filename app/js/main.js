  $(function() {
    $('.menu-block--toggle').on('click', function() {
      $('.menu-nav--list').slideToggle(400, function(){
      	if($(this).css('display') === 'none'){
      		$(this).removeAttr('style');
      	}
      });
    });
  });
// Buttom top 
var $btnTop = $(".btn-top")
$(window).on("scroll", function() {
  if ($(window).scrollTop() >= 20) {
    $btnTop.fadeIn();
  }
  else {
    $btnTop.fadeOut();
  }
});
$btnTop.on("click", function() {
  $("html,body").animate({scrollTop:0}, 900)
});
// Map
function initMap() {
  var uluru = {lat: 48.4692332, lng: 38.8114223};
  var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 15,
      center: uluru
  });
  var marker = new google.maps.Marker({
      position: uluru,
      map: map
  });
}
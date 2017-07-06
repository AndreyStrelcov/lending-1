(function($){
  $(function() {
    $('.menu-block--toggle').on('click', function() {
      $(this).closest('.menu-block').toggleClass('menu_state_open');
    });
  });
})(jQuery);
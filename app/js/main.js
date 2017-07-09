  $(function() {
    $('.menu-block--toggle').on('click', function() {
      $('.menu-nav--list').slideToggle(400, function(){
      	if($(this).css('display') === 'none'){
      		$(this).removeAttr('style');
      	}
      });
    });
  });
  
  // $(function()
  //       {
  //           alert('Подключена последняя версия jQuery через Google хостинг');
  //       });
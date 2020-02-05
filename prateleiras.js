
  $('body').bind("DOMSubtreeModified",function(){
  
  
      $(".product-image .hover", "body").hide();
      $( ".product-image", "body" ).mouseenter( function(){
        $(".principal", this).hide(); 
        $(".hover", this).show()
      } ).mouseleave( function(){
        $(".hover",this).hide();
        $(".principal", this).show()
      } );
  });
  
  
  
  
  /*
  
  $(".hidden-button").css("display", "none");$('.prateleira li').mouseenter(function() {
    $(".hidden-button",this).css("display", "block");
  })

  $('.prateleira li').mouseleave(function() {
      $(".hidden-button",this).css("display", "none");
    })
     



    $(".product-image .hover", "body").hide();
    $( ".product-image", "body" ).mouseenter( function(){
      $(".principal", this).hide(); 
      $(".hover", this).show()
    } ).mouseleave( function(){
      $(".hover",this).hide();
      $(".principal", this).show()
    } );*/
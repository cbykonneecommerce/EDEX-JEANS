
    var text =  $(".w-100.pv4.fl div p.mb0 span").text();
    
    var prazo = parseInt(text.replace(/[^0-9]/g,'')); 
    console.log(prazo);
        var today = new Date(Date.now() + prazo * 24*60*60*1000);
     
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    
    today = yyyy + '-' + mm + '-' + dd;
    
        
        
          window.renderOptIn = function() {
        window.gapi.load('surveyoptin', function() {
          window.gapi.surveyoptin.render(
            {
              // REQUIRED FIELDS
              "merchant_id": 144827043,
              "order_id": $("#order-id").text(),
              "email": $(".cconf-client-email").text(),
              "delivery_country": "BRA",
              "estimated_delivery_date": today,
            });
        });
      }
      
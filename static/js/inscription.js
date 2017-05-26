$(function (){ 

   $('input[type=radio][name=study]').change(function(){
       switch($(this).val()) {
         case 'true':
            $('#career').removeAttr('disabled');
            $('#institute').removeAttr('disabled');
             break;
         case 'false':
          $('#career').attr('disabled', 'disabled');
          $('#institute').attr('disabled', 'disabled');
             break;
     }
   });
    $('input[type=radio][name=job]').change(function(){
       switch($(this).val()) {
         case 'true':
          $('#company').removeAttr('disabled');         
          $('#role').removeAttr('disabled');         
          $('#phone-company').removeAttr('disabled');         
             break;
         case 'false':
          $('#company').attr('disabled', 'disabled');         
          $('#role').attr('disabled', 'disabled');         
          $('#phone-company').attr('disabled', 'disabled');
             break;
     }
   });
   $('input[type=radio][name=dad]').change(function(){
       switch($(this).val()) {
         case 'true':
          $('#name-dad').removeAttr('disabled', 'disabled');         
          $('#ocupation-dad').removeAttr('disabled', 'disabled');         
          $('#phone-dad').removeAttr('disabled', 'disabled');
          $('#mobile-dad').removeAttr('disabled', 'disabled');
          $('#address-dad').removeAttr('disabled', 'disabled');         
             break;
         case 'false':
          $('#name-dad').attr('disabled', 'disabled');         
          $('#ocupation-dad').attr('disabled', 'disabled');         
          $('#phone-dad').attr('disabled', 'disabled');
          $('#mobile-dad').attr('disabled', 'disabled');
          $('#address-dad').attr('disabled', 'disabled');
             break;
     }
   });
    $('input[type=radio][name=mom]').change(function(){
       switch($(this).val()) {
         case 'true':
          $('#name-mom').removeAttr('disabled', 'disabled');         
          $('#ocupation-mom').removeAttr('disabled', 'disabled');         
          $('#phone-mom').removeAttr('disabled', 'disabled');
          $('#mobile-mom').removeAttr('disabled', 'disabled');
          $('#address-mom').removeAttr('disabled', 'disabled');         
             break;
         case 'false':
          $('#name-mom').attr('disabled', 'disabled');         
          $('#ocupation-mom').attr('disabled', 'disabled');         
          $('#phone-mom').attr('disabled', 'disabled');
          $('#mobile-mom').attr('disabled', 'disabled');
          $('#address-mom').attr('disabled', 'disabled');
             break;
     }
   });
})
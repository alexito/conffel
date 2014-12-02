(function ($) {
  Drupal.behaviors.custom_functions = {
    attach: function (context, settings) {
      $(window).load(function () {

        $('input[data-custom-num="1"]').each(function (i, e) {
          $(e).blur(function () {
            max = $(this).attr('data-max');
            val = $(this).val();
            if(val > max){
              $(this).val(max);
              alert('El valor ingresado supera el maximo para este item. Recuerde no superar el valor maximo.');              
            }
          });
          $(e).keydown(function (e)
          {
            var key = e.charCode || e.keyCode || 0;
            // allow backspace, tab, delete, enter, arrows, numbers and keypad numbers ONLY
            // home, end, period, and numpad decimal
            return (
                    key == 8 ||
                    key == 9 ||
                    key == 13 ||
                    key == 46 ||
                    key == 110 ||
                    key == 190 ||
                    (key >= 35 && key <= 40) ||
                    (key >= 48 && key <= 57) ||
                    (key >= 96 && key <= 105));
          });
        });

      });


      function calendarWidget(el, params) {
      }

    }
  };
  $(document).ready(function () {

  });
})(jQuery);
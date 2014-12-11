(function ($) {
  Drupal.behaviors.custom_functions = {
    attach: function (context, settings) {
      $(window).load(function () {

        //GUARDAR DIARIO
        $('span.guardar-diario').click(function () {
          var data = {info: []};

          $('.views-table.table-diario').each(function (i, table) {
            var mod_id = $('tbody tr.item-diario', table).attr('data-mod-id');

            data.info[i] = {mod_id: mod_id, empleados: [], tarjetas: '', vxm: ''};
            
            $('tbody tr.item-diario', table).each(function (ind, tr) {
              nid = $('td.views-field-nid', tr).text().trim();
              vxm = $('input#vxm_' + nid, tr).val();
              ctp = $('input#ctp_' + nid, tr).val();
              rh = $('input#rh_' + nid, tr).val();
              uds = $('input#uds_' + nid, tr).val();
              
              data.info[i].tarjetas = ctp;
              data.info[i].vxm = vxm;
              data.info[i].uds = uds;
              
              data.info[i].empleados[ind] = {
                emp_id: nid,
                rh: rh                
              };
            });

            if ((i + 1) === $('.views-table.table-diario').length) {
              $.ajax({
                type: "POST",
                url: 'guardar-diario',
                data: data,
                success: function (resp) {
                  console.log(resp);
                },
              });
            }

          });
        });


        //Deshabilita campos del diario q tienen valores repetidos
        $('body.page-diario .view-diario table.views-table').each(function (i, e) {
          $(this).find('.views-field-php input').each(function (ind, el) {
            if (ind > 0) {
              $(this).attr('disabled', true);
            }
          });
          $(this).find('.views-field-php-2 input').each(function (ind, el) {
            if (ind > 0) {
              $(this).attr('disabled', true);
            }
          });
          $(this).find('.views-field-php-3 input').each(function (ind, el) {
            if (ind > 0) {
              $(this).attr('disabled', true);
            }
          });
        });

        //Guarda el diario.
        $('.guardar-diario').click(function () {
          $('body.page-diario .view-diario table .item-diario').each(function (i, e) {

          });
        });


        $('input[data-custom-num="1"]').each(function (i, e) {

          $(e).blur(function () {
            val = $(this).val();

            if ($(this).parent().hasClass('views-field-php')) {
              tbody = $(this).closest('tbody');
              $('.views-field-php input', tbody).val(val);
            } else if ($(this).parent().hasClass('views-field-php-2')) {
              tbody = $(this).closest('tbody');
              $('.views-field-php-2 input', tbody).val(val);
            } else if ($(this).parent().hasClass('views-field-php-3')) {
              tbody = $(this).closest('tbody');
              $('.views-field-php-3 input', tbody).val(val);
            } else {
              max = $(this).attr('data-max');

              if (val > max) {
                $(this).val(max);
                alert('El valor ingresado supera el maximo para este item. Recuerde no superar el valor maximo.');
              }
            }
          });
          $(e).keydown(function (el)
          {
            var key = el.charCode || el.keyCode || 0;
            // allow backspace, tab, delete, enter, arrows, numbers and keypad numbers ONLY
            // home, end, period, and numpad decimal
            return (
                    key == 8 ||
                    key == 9 ||
                    key == 13 ||
                    key == 46 ||
                    key == 110 ||
                    key == 188 ||
                    key == 190 ||
                    (key >= 35 && key <= 40) ||
                    (key >= 48 && key <= 57) ||
                    (key >= 96 && key <= 105));
          });
        });

      });


    }
  };
  $(document).ready(function () {

  });
})(jQuery);
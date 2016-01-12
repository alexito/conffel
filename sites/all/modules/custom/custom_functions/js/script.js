(function ($) {
  Drupal.behaviors.custom_functions = {
    attach: function (context, settings) {
      $(window).load(function () {

        var cat = ['crt', 'cnf', 'prp', 'trm', 'cnt', 'mpq'];

        // Diario
        $('.node-diario-form .panel-body:not(.processed)').addClass('processed').each(function(){
          var panel = this;
          var valor_minuto = 0;
          var panel_parent = $(panel).parent();

          var grupo = getGrupo(panel_parent);

          // Remueve los elementos innecesarios
          setInterval(function() {
            if ($('.sticky-header, .field-multiple-drag', panel).length > 0) {
              $('.sticky-header', panel).remove();
              $('.field-multiple-drag', panel).remove();
            }
          }, 500)

          // Adjunta comportamiento a los campos
          setInterval(function() {

            // ---------------- TARJETA
            $('.field-name-field-tarjeta:not(.processed)', panel).addClass('processed').each(function() {
              var tarjeta = this;
              $('input.form-text', tarjeta).blur(function() {
                var nid = $(this).val().split(':');
                nid = nid[1].split(']');
                nid = nid[0];

                $.post( "/get-tarjeta-info/" + nid, function( data ) {
                  console.log(data)
                  var sam = 0;
                  if (grupo == 'corte') {
                    sam = parseFloat(data.info.field_sam_corte.und[0].value);
                  }
                  if (grupo == 'confeccion') {
                    sam = parseFloat(data.info.field_sam_confeccion.und[0].value);
                  }
                  if (grupo == 'preparacion') {
                    sam = parseFloat(data.info.field_sam_preparacion.und[0].value);
                  }
                  if (grupo == 'terminado') {
                    sam = parseFloat(data.info.field_sam_terminado.und[0].value);
                  }
                  if (grupo == 'control-de-calidad') {
                    sam = parseFloat(data.info.field_sam_control_de_calidad.und[0].value);
                  }
                  if (grupo == 'empaque') {
                    sam = parseFloat(data.info.field_sam_empaque.und[0].value);
                  }

                  $(tarjeta).closest('td').find('.field-name-field-sam input.form-text').val(sam);

                  calcularPanel(panel, valor_minuto);
                });
              });
            });


          }, 500);

          // Ejecuta recalculacion despues de algun cambio en el valor minuto
          var input_vmin = $('> .field-type-number-decimal input', panel);

          setAsDecimal(input_vmin);

          $(input_vmin).blur(function() {

            // Valor Minuto
            if ($(this).val() == '') {
              valor_minuto = 0;
              $(this).val(0);
            }
            else {
              try{
                valor_minuto = parseFloat($(this).val());
                $(this).val(valor_minuto);
              }catch (e){
                valor_minuto = 0;
                $(this).val(0);
              }
            }

            // Recalcula el panel completo
            calcularPanel(panel, valor_minuto);
          });

        });



        function calcularModulo(modulo, panel, valor_minuto) {
          var limite_tarjetas = $('.field-name-field-tarjetas  > div > div > table.field-multiple-table > tbody > tr', modulo).length;
          var limite_operadores = $('.field-name-field-operadores  > div > div > table.field-multiple-table > tbody > tr', modulo).length;

          var total_min_prod = 0;
          var total_uds = 0;
          $('.field-name-field-tarjetas  > div > div > table.field-multiple-table > tbody > tr', modulo).each(function (i, e) {

            // --------------------- Calculando Tarjetas
            var tarjeta = this;

            var uds = parseInt($('.field-name-field-uds input.form-text', tarjeta).val());
            var sam = parseFloat($('.field-name-field-sam input.form-text', tarjeta).val());

            var min_prod = parseFloat(uds * sam);

            total_uds += uds;
            total_min_prod += parseFloat(min_prod);

            $('.field-name-field-min-prod input.form-text', tarjeta).val(min_prod);

            if ((i + 1) === limite_tarjetas) {
              // Guarda los valores totales de la tarjeta
              $('.field-name-field-total-uds input.form-text', modulo).val(total_uds);
              $('.field-name-field-total-min-prod input.form-text', modulo).val(total_min_prod);

              // --------------------- Calculando el total de Horas reales

              var total_real_horas = 0;
              $('.field-name-field-operadores  > div > div > table.field-multiple-table > tbody > tr', modulo).each(function (ind, elem) {
                var operador = this;

                var real_horas = parseInt($('.field-name-field-real-horas input.form-text', operador).val());

                total_real_horas += real_horas;

                if ((ind + 1) === limite_operadores) {
                  // Guarda el total de horas reales
                  $('.field-name-field-total-real-horas input.form-text', modulo).val(total_real_horas);

                  // Calcula la EFICIENCIA, previo a calcular el valor a pagar
                  var eficiencia = parseFloat(total_min_prod / parseFloat(total_real_horas * 60));
                  $('.field-name-field-eficiencia input.form-text', modulo).val(eficiencia);


                  // --------------------- Calculando el Valor a Pagar
                  var total_us;
                  $('.field-name-field-operadores  > div > div > table.field-multiple-table > tbody > tr', modulo).each(function (ind_, elem_) {
                    var operador_ = this;

                    var real_horas_ = parseInt($('.field-name-field-real-horas input.form-text', operador_).val());

                    var us = parseFloat(eficiencia * valor_minuto * real_horas_ * 60);

                    $('.field-name-field-us input.form-text', operador_).val(us);
                    total_us += parseFloat(us);

                    if ((ind_ + 1) === limite_operadores) {
                      $('.field-name-field-total-us input.form-text', modulo).val(total_us);
                    }
                  });
                }
              });
            }
          });
        }

        function calcularPanel(panel, valor_minuto) {
          $('> .field-type-field-collection > div > div > table.field-multiple-table > tbody > tr', panel).each(function () {
            var modulo = this;
            calcularModulo(modulo, panel, valor_minuto);
          });
        }

        function getValorMinuto () {

        }

        function getGrupo(panel_parent) {
          if ($(panel_parent).hasClass('group_corte')) {
            return 'corte';
          }
          if ($(panel_parent).hasClass('group_confeccion')) {
            return 'confeccion';
          }
          if ($(panel_parent).hasClass('group_preparacion')) {
            return 'preparacion';
          }
          if ($(panel_parent).hasClass('group_terminado')) {
            return 'terminado';
          }
          if ($(panel_parent).hasClass('group_control-de-calidad')) {
            return 'control-de-calidad';
          }
          if ($(panel_parent).hasClass('group_empaque')) {
            return 'empaque';
          }
        }

        function setAsDecimal(element) {
          $(element).keydown(function (el)
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
        };

        //Actualiza textos de los botones
        if (!$('body').hasClass('page-inicio')) {

          setInterval(function(){
            for (var i = 0; i < cat.length; i++) {
              $('.field-type-field-collection.field-name-field-' + cat[i] + '-modulos > div > div > div > button.btn-info:not(.procesado)').removeClass('btn-info').addClass('btn-success procesado').text('+ Módulo');
              $('.field-type-field-collection.field-name-field-operadores .btn-info:not(.procesado)').addClass('procesado').text('+ Operador');
              $('.field-type-field-collection.field-name-field-tarjetas .btn-info:not(.procesado)').addClass('procesado').text('+ Tarjeta');

              $('.btn-danger:not(.procesado)').addClass('procesado').text('X');
            }

          }, 500);
        }


        //Inicializa el Calendario
        var d = new Date();
        $("#calendar").calendarWidget({
          day: d.getDate(),
          month: d.getMonth(),
          year: d.getFullYear()
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

        //Elimina elementos innecesarios de la impresion
        $('.print-site_name, .print-breadcrumb, .print-hr').remove();

        if (window.location.href.indexOf('/print/') > 0) {
          $('.remove-on-print').remove()
        }
        $('body').click(function(){
          $('.msg-text').fadeOut(800, function(){
            $(this).remove();
          });
        });

        //Configura los imputs para permitir solo numeros
        $('input[data-custom-num="1"]').each(function (i, e) {

          $(e).blur(function () {
            var val = $(this).val();
            var max = $(this).attr('data-max');
            if (parseInt(val) > parseInt(max)) {
              $(this).val(max);
              $('body').append('<div class="msg-text">El valor ingresado supera el máximo para este item. Recuerde no superar el valor máximo.</div>');
              $('.msg-text').fadeOut(0);
              $('.msg-text').fadeIn(800);
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

        // TARJETA DE PRODUCCION
        $('input.field_talla').parent().addClass('field_talla_wrapper');
        var vista = $('#tarjeta-de-produccion-node-form .view-id-lista_de_cortes').detach();
        $('#tarjeta-de-produccion-node-form > div').prepend(vista);

      });

      //--------CALENDAR WIDGET
      function calendarWidget(el, params) {

        var now = new Date();
        var thismonth = now.getMonth();
        var thisyear = now.getYear() + 1900;
        var day = now.getDate();

        var opts = {
          month: thismonth,
          year: thisyear,
          day: day
        };

        $.extend(opts, params);

        var monthNames = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
        var dayNames = ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa'];
        month = i = parseInt(opts.month);
        year = parseInt(opts.year);
        var m = 0;
        var table = '';

        // next month
        if (month == 11) {
          n_month = (year+1) + '-1';
          var next_month = '<a href="?month=' + 1 + '&amp;year=' + (year + 1) + '" title="' + monthNames[0] + ' ' + (year + 1) + '">' + monthNames[0] + ' ' + (year + 1) + '</a>';
        } else {
          n_month = (year) + '-' + (month + 2);
          var next_month = '<a href="?month=' + (month + 2) + '&amp;year=' + (year) + '" title="' + monthNames[month + 1] + ' ' + (year) + '">' + monthNames[month + 1] + ' ' + (year) + '</a>';
        }

        // previous month
        if (month == 0) {
          p_month = (year - 1) + '-12';
          var prev_month = '<a href="?month=' + 12 + '&amp;year=' + (year - 1) + '" title="' + monthNames[11] + ' ' + (year - 1) + '">' + monthNames[11] + ' ' + (year - 1) + '</a>';
        } else {
          p_month = (year) + '-' + month;
          var prev_month = '<a href="?month=' + (month) + '&amp;year=' + (year) + '" title="' + monthNames[month - 1] + ' ' + (year) + '">' + monthNames[month - 1] + ' ' + (year) + '</a>';
        }

        table += ('<div><span class="m-back" data-month="' + p_month + '"> < </span><span class="m-next" data-month="' + n_month + '"> > </span></div>');

        table += ('<h3 id="current-month">' + monthNames[month] + ' ' + year + '</h3>');
        // uncomment the following lines if you'd like to display calendar month based on 'month' and 'view' paramaters from the URL
        //table += ('<div class="nav-prev">'+ prev_month +'</div>');
        //table += ('<div class="nav-next">'+ next_month +'</div>');
        table += ('<table class="calendar-month" ' + 'id="calendar-month' + i + ' " cellspacing="0">');

        table += '<tr>';

        for (d = 0; d < 7; d++) {
          table += '<th class="weekday">' + dayNames[d] + '</th>';
        }

        table += '</tr>';

        var days = getDaysInMonth(month, year);
        var firstDayDate = new Date(year, month, 1);
        var firstDay = firstDayDate.getDay();

        var prev_days = getDaysInMonth(month, year);
        var firstDayDate = new Date(year, month, 1);
        var firstDay = firstDayDate.getDay();

        var prev_m = month == 0 ? 11 : month - 1;
        var prev_y = prev_m == 11 ? year - 1 : year;
        var prev_days = getDaysInMonth(prev_m, prev_y);
        firstDay = (firstDay == 0 && firstDayDate) ? 7 : firstDay;

        var i = 0;
        for (j = 0; j < 42; j++) {
          today = '';
          if ((j < firstDay)) {
            cday=(prev_days - firstDay + j + 1)
            table += ('<td class="other-month"><span class="day"></span></td>');
          } else if ((j >= firstDay + getDaysInMonth(month, year))) {
            i = i + 1;
            cday = i;
            table += ('<td class="other-month"><span class="day"></span></td>');
          } else {
            if ((j - firstDay + 1) == opts.day) {
              today = 'today'
            }
            cmonth = (month+1);
            if(cmonth < 10){
              cmonth = '0' + cmonth;
            }
            
            cday = (j - firstDay + 1);
            if(cday < 10)
              cday = '0' + cday;
            table += ('<td class="current-month day' + cday + ' ' + today + '"><span class="day"><a target="_blank" href="imprimir-diario/' + year +'-' + cmonth + '-' + cday +'">' + cday + '</a></span></td>');
          }
          if (j % 7 == 6)
            table += ('</tr>');
        }

        table += ('</table>');
        table += ('<hr><span style="">Haga click en una fecha para ver los detalles e Imprimir.</span>');

        el.html(table);
        
        var d = new Date();
        $(".m-next, .m-back").click(function(e){
          info = $(e.target).attr('data-month').split('-');
          $("#calendar").html('');
          $("#calendar").calendarWidget({
            day: d.getDate(),
            month: info[1] - 1,
            year: info[0]
          });          
        });
      }

      function getDaysInMonth(month, year) {
        var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        if ((month == 1) && (year % 4 == 0) && ((year % 100 != 0) || (year % 400 == 0))) {
          return 29;
        } else {
          return daysInMonth[month];
        }
      }


      // jQuery plugin initialisation
      $.fn.calendarWidget = function (params) {
        calendarWidget(this, params);
        return this;
      };


    }
  };
  $(document).ready(function () {

  });
})(jQuery);
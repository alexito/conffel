(function ($) {
  Drupal.behaviors.custom_functions = {
    attach: function (context, settings) {
      $(window).load(function () {

        //Inicializa el Calendario
        var d = new Date();
        $("#calendar").calendarWidget({
          day: d.getDate(),
          month: d.getMonth(),
          year: d.getFullYear()
        });
        
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

        //Elimina elementos innecesarios de la impresion
        $('.print-site_name, .print-breadcrumb, .print-hr').remove();

        if (window.location.href.indexOf('/print/') > 0) {
          $('.remove-on-print').remove()
        }


        //Configura los imputs para permitir solo numeros
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
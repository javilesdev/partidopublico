$(document).ready(function(){
  Raphael.fn.donutChart = function (cx, cy, r, rin, values, labels, stroke, legend, legendElement, colors) {
    var paper = this,
      rad = Math.PI / 180,
      chart = this.set();

    function sector(cx, cy, r, startAngle, endAngle, params) {
      var x1 = cx + r * Math.cos(-startAngle * rad),
        x2 = cx + r * Math.cos(-endAngle * rad),
        y1 = cy + r * Math.sin(-startAngle * rad),
        y2 = cy + r * Math.sin(-endAngle * rad),
        xx1 = cx + rin * Math.cos(-startAngle * rad),
        xx2 = cx + rin * Math.cos(-endAngle * rad),
        yy1 = cy + rin * Math.sin(-startAngle * rad),
        yy2 = cy + rin * Math.sin(-endAngle * rad);

       var cc = paper.path([
        "M", xx1, yy1,
          "L", x1, y1,
          "A", r, r, 0, +(endAngle - startAngle > 180), 0, x2, y2,
          "L", xx2, yy2,
          "A", rin, rin, 0, +(endAngle - startAngle > 180), 1, xx1, yy1, "z"
      ]).attr(params);
      // cc.node.id = params.fill;
      return cc ;

    }
    var angle = 0,
      total = 0,
      start = 0,
      PaddingTop = 0,
      process = function (j) {
        var value = values[j],
          angleplus = 360 * value / total,
          popangle = angle + (angleplus / 2),
          color = Raphael.hsb(start, .75, 1),
          ms = 200,
          delta = 25,
          bcolor = Raphael.hsb(start,1,1) ;
          bcolor = colors[j%colors.length];
          draw_params = {fill: "90-" + bcolor + "-" + bcolor, stroke: stroke, "stroke-width": 3}
          var p = sector(cx, cy, r, angle, angle + angleplus, draw_params);

          if (legend == true && legendElement) {
            switch(labels[j]) {
              case 'hombres':
                legendElement.append('<li><i class="fa fa-circle" aria-hidden="true" data-id='+ bcolor +' style="color:' + bcolor + ';"></i> ' + labels[j] + " : " + values[j] + '</li>');
                break;
              case 'mujeres':
                legendElement.append('<li><i class="fa fa-circle" aria-hidden="true" data-id='+ bcolor +' style="color:' + bcolor + ';"></i> ' + labels[j] + " : " + values[j] + '</li>');
                break;
              default:
                legendElement.append('<li><i class="fa fa-circle" aria-hidden="true" data-id='+ bcolor +' style="color:' + bcolor + ';"></i> ' + labels[j] + " : " + values[j] + '</li>');
                break;
            }
          }

        // ****** Added BY SM ******* //
        var startangle=angle;
        var endangle= angle + angleplus;
        var middleangle = (startangle + endangle) / 2;

        var left = 0, top = 0;
        var percentcloseMaxValue=0;
        if (middleangle >= 0  && middleangle < 90){
        // top will be negative -10 to 0
        // left will be positive 0 to 10
          percentcloseMaxValue = middleangle/90;
          top = -10 * percentcloseMaxValue;
          left = 10 * (1 - percentcloseMaxValue);
        }
        if (middleangle >= 90  && middleangle < 180){
          // top will be negative -10 to 0
          // left will be negative -10 to 0
          percentcloseMaxValue = (180-middleangle)/90;
          top = -10 * percentcloseMaxValue;
          left = -10 * (1-percentcloseMaxValue);
        }

        if (middleangle >= 180  && middleangle < 270){
          // top will be positive 0 to 10
          // left will be negative -10 to 0
          percentcloseMaxValue = (270-middleangle)/90;
          top = 10 * (1 - percentcloseMaxValue);
          left = -10 * percentcloseMaxValue;
        }
        if (middleangle >= 270  && middleangle < 360){
        // top will be positive 0 to 10
        // left will be positive 0 to 10
          percentcloseMaxValue = (360-middleangle)/90;
          top = 10 * percentcloseMaxValue;
          left = 10 * (1 - percentcloseMaxValue);
        }

        // ************* //

        p.mouseover(function () {
          p.stop().animate({transform: "t" + left + "," + top + ", s1.05 1.05"}, ms, "easin");
        }).mouseout(function () {
          p.stop().animate({transform: ""}, ms, "easeout");
        });

        angle += angleplus;
        chart.push(p);
        start += .1;

      };

    for (var i = 0, ii = values.length; i < ii; i++) {
      total += values[i];
    }

    for (i = 0; i < ii; i++) {
      process(i);
    }

    return chart;
  };

  Raphael.fn.ingresos_ordinarios_chart = function(datos, datos_totales, fecha_seleccionada){
    var paper = this;
    var header_height = 40;
    var line_height = 40;
    var chart_width = 700;


    function ingreso_ordinario_bar(x, y, w, h, v, p, t, c){
      var x_start = x,
          max_width = 230,
          bar_x_start = x + 350,
          text_x_start = x + 5,
          y_start = y ,
          bar_y_start = y + 10,
          text_y_start = x + 20,
          width = w,
          x_end = x_start + 300,
          percentage = p,
          aux = (max_width * (percentage / 100)),
          bar_x_end = bar_x_start + aux,
          height = h,
          y_end = y_start + 25
          value = v,
          text = t
          color = c;

          if((aux > 0) && (aux < 1)){
            bar_x_end = bar_x_start + 1;
          }

      //console.log(x_start);

      var category_label = paper.text(text_x_start, y_start + height /2 , text)
           .attr({
             "font-family" : "Karla-Regular, Karla",
             "font-size" : 14,
             'text-anchor': 'start'
           });

      // console.log(category_label);

      var barra = paper.path([
       "M", bar_x_start, bar_y_start,
       "L", bar_x_end, bar_y_start,
       "L", bar_x_end, y_end,
       "L", bar_x_start, y_end,
       "L", bar_x_start, bar_y_start])
            .attr({ fill : color,
                    stroke : "none"});



       paper.text(text_x_start + 690, y_start + height /2 , "$"+value)
            .attr({
              "font-family" : "Karla-Regular, Karla",
              "font-size" : 20,
              'text-anchor': 'end',
              'font-weight' : "bold"
            });

       paper.path(["M", x_start, y_start, width, y_start])

       return barra;

    };

    function ingresos_ordinarios_header(){
      paper.circle(12, 15, 9 )
      .attr({
        "fill" : "#23DBB8",
        "stroke" : "none"
      });

      paper.text(28, 17, "Aportes públicos")
      .attr({
        "font-family" : "Karla-Regular, Karla",
        "font-size" : 14,
        'text-anchor': 'start'
      });

      paper.circle(191, 15, 9 )
      .attr({
        "fill" : "#19A58A",
        "stroke" : "none"
      });

      paper.text(207, 17, "Aportes privados")
      .attr({
        "font-family" : "Karla-Regular, Karla",
        "font-size" : 14,
        'text-anchor': 'start'
      });

      paper.text(650, 17, "Datos de "+fecha_seleccionada)
      .attr({
        "font-family" : "Karla-Regular, Karla",
        "font-size" : 25,
        'text-anchor': 'end'
      });

      paper.text(10, header_height + 20, "Concepto")
      .attr({
        "font-family" : "Karla-Regular, Karla",
        "font-size" : 16,
        'text-anchor': 'start',
        'font-weight' : "bold"
      });

      paper.text(360, header_height + 20, "Monto")
      .attr({
        "font-family" : "Karla-Regular, Karla",
        "font-size" : 16,
        'text-anchor': 'start',
        'font-weight' : "bold"
      });
    };

    function ingresos_ordinarios_footer(datos, datos_totales){
      var y_start = header_height +line_height + (datos.length * line_height) + 10;
      var bar_width = chart_width - 12;
      var publicos_width = bar_width * (datos_totales.publicos / (datos_totales.publicos + datos_totales.privados))

      paper.rect(6, y_start + 20, publicos_width, 40)
      .attr({
        "fill" : "#23DBB8",
        "stroke" : "none"
      });

      paper.rect(6 + publicos_width , y_start + 20, bar_width - publicos_width, 40)
      .attr({
        "fill" : "#19a58a",
        "stroke" : "none"
      });

      paper.text(6, y_start, "TOTAL")
      .attr({
        "font-family" : "Karla-Regular, Karla",
        "font-size" : 26,
        'text-anchor': 'start',
        'font-weight' : "bold"
      });

      paper.text(chart_width - 10, y_start, "$" + (datos_totales.publicos + datos_totales.privados))
      .attr({
        "font-family" : "Karla-Regular, Karla",
        "font-size" : 26,
        'text-anchor': 'end',
        'font-weight' : "bold"
      });

    };

    var p = ingresos_ordinarios_header();

    for( var x = 0, y = datos.length; x<y; x++ ){
      var color = '#19a58a';
      if (datos[x].text == "Aportes Estatales") {
        color = '#23DBB8';
      }

      var p = ingreso_ordinario_bar(0, header_height + line_height + (line_height * x) , chart_width, 30, datos[x].value, datos[x].percentage, datos[x].text, color);
    }

    var p = ingresos_ordinarios_footer(datos, datos_totales);
  };

  Raphael.fn.egresos_ordinarios_chart = function(datos, datos_totales, fecha_seleccionada){
    var paper = this;
    var header_height = 40;
    var line_height = 40;
    var chart_width = 700;
    var bar_width = 210;

    function egreso_ordinario_bar(y, v, pub, pri, p, t){
      var x_start = 0,
          max_width = bar_width,
          bar_x_start = x_start + 350,
          text_x_start = x_start + 5,
          y_start = y ,
          bar_y_start = y + 10,
          text_y_start = y_start + 20,
          percentage = p,
          aux = (max_width * (percentage / 100)),
          bar_x_end = bar_x_start + aux,
          y_end = y_start + 25
          value = v,
          text = t,
          height = 40,
          publicos = parseInt(pub),
          privados = parseInt(pri);
          factor_1 = publicos /(publicos + privados);
          publicos_width = Math.ceil(aux * factor_1)

          if(text.length > 50){
            word_array = text.split(" ");
            console.log(word_array);
            array_size = word_array.length;
            console.log(array_size);
            half_size = Math.ceil(array_size /2 );
            console.log(half_size);
            first_line = word_array.slice(0, half_size).join(" ")
            console.log(first_line);
            last_line = word_array.slice(half_size, array_size).join(" ")
            console.log(text);
            console.log(first_line);
            console.log(last_line);
            var category_label1 = paper.text(text_x_start, -8 + y_start + height /2 , first_line)
                 .attr({
                   "font-family" : "Karla-Regular, Karla",
                   "font-size" : 14,
                   'text-anchor': 'start'
                 });

            var category_label2 = paper.text(text_x_start, 9 + y_start + height /2 , last_line)
                .attr({
                  "font-family" : "Karla-Regular, Karla",
                  "font-size" : 14,
                  'text-anchor': 'start'
                });
          } else {

            var category_label = paper.text(text_x_start, y_start + height /2 , text)
                 .attr({
                   "font-family" : "Karla-Regular, Karla",
                   "font-size" : 14,
                   'text-anchor': 'start'
                 });
          }

      // var category_label = paper.text(text_x_start, text_y_start, text)
      //      .attr({
      //        "font-family" : "Karla-Regular, Karla",
      //        "font-size" : 12,
      //        'text-anchor': 'start'
      //      });

      paper.rect(bar_x_start, bar_y_start, publicos_width, 20).attr({
        "fill" : "#23DBB8",
        "stroke" : "none"
      });
      paper.rect(bar_x_start + publicos_width, bar_y_start, aux - publicos_width, 20).attr({
        "fill" : "#19a58a",
        "stroke" : "none"
      });

      paper.text(chart_width - 5, text_y_start, "$"+value)
            .attr({
              "font-family" : "Karla-Regular, Karla",
              "font-size" : 20,
              'text-anchor': 'end',
              'font-weight' : "bold"
            });

      paper.path(["M", 0, y_start, chart_width, y_start])
    };

    function egresos_ordinarios_header(){
      paper.circle(12, 15, 9 )
      .attr({
        "fill" : "#23DBB8",
        "stroke" : "none"
      });

      paper.text(28, 17, "Egresos de fondos públicos")
      .attr({
        "font-family" : "Karla-Regular, Karla",
        "font-size" : 14,
        'text-anchor': 'start'
      });

      paper.circle(247, 15, 9 )
      .attr({
        "fill" : "#19A58A",
        "stroke" : "none"
      });

      paper.text(263, 17, "Egresos de fondos privados")
      .attr({
        "font-family" : "Karla-Regular, Karla",
        "font-size" : 14,
        'text-anchor': 'start'
      });

      paper.text(680, 17, "Datos de "+fecha_seleccionada)
      .attr({
        "font-family" : "Karla-Regular, Karla",
        "font-size" : 25,
        'text-anchor': 'end'
      });

      paper.text(10, header_height + 20, "Concepto")
      .attr({
        "font-family" : "Karla-Regular, Karla",
        "font-size" : 16,
        'text-anchor': 'start',
        'font-weight' : "bold"
      });

      paper.text(360, header_height + 20, "Monto")
      .attr({
        "font-family" : "Karla-Regular, Karla",
        "font-size" : 16,
        'text-anchor': 'start',
        'font-weight' : "bold"
      });
    };

    function egresos_ordinarios_footer(datos, datos_totales){
      var y_start = header_height +line_height + (datos.length * line_height) + 10;
      var bar_width = chart_width - 12;
      var publicos_width = bar_width * (datos_totales.publicos / (datos_totales.publicos + datos_totales.privados))

      paper.rect(6, y_start + 20, publicos_width, 40)
      .attr({
        "fill" : "#23DBB8",
        "stroke" : "none"
      });

      paper.rect(6 + publicos_width , y_start + 20, bar_width - publicos_width, 40)
      .attr({
        "fill" : "#19a58a",
        "stroke" : "none"
      });

      paper.text(6, y_start, "TOTAL")
      .attr({
        "font-family" : "Karla-Regular, Karla",
        "font-size" : 26,
        'text-anchor': 'start',
        'font-weight' : "bold"
      });

      paper.text(chart_width - 10, y_start, "$" + (datos_totales.publicos + datos_totales.privados))
      .attr({
        "font-family" : "Karla-Regular, Karla",
        "font-size" : 26,
        'text-anchor': 'end',
        'font-weight' : "bold"
      });

    };

    var p = egresos_ordinarios_header();

    for( var x = 0, y = datos.length; x<y; x++ ){
      var p = egreso_ordinario_bar(header_height + line_height + (line_height * x), datos[x].value, datos[x].value_publico, datos[x].value_privado, datos[x].percentage, datos[x].text);
    }

    var p = egresos_ordinarios_footer(datos, datos_totales);
  };

  Raphael.fn.transferencias_chart = function(datos, datos_totales, fecha_seleccionada){
    var paper = this;
    var header_height = 40;
    var line_height = 40;
    var chart_width = 700;


    function transferencia_bar(x, y, w, h, v, p, t, c){
      var x_start = x,
          max_width = 230,
          bar_x_start = x + 350,
          text_x_start = x + 5,
          y_start = y ,
          bar_y_start = y + 10,
          text_y_start = x + 20,
          width = w,
          x_end = x_start + 300,
          percentage = p,
          aux = (max_width * (percentage / 100)),
          bar_x_end = bar_x_start + aux,
          height = h,
          y_end = y_start + 25
          value = v,
          text = t
          color = c;

          if((aux > 0) && (aux < 1)){
            bar_x_end = bar_x_start + 1;
          }

      //console.log(x_start);

      if(text.length > 50){
        word_array = text.split(" ");
        console.log(word_array);
        array_size = word_array.length;
        console.log(array_size);
        half_size = Math.ceil(array_size /2 );
        console.log(half_size);
        first_line = word_array.slice(0, half_size).join(" ")
        console.log(first_line);
        last_line = word_array.slice(half_size, array_size).join(" ")
        console.log(text);
        console.log(first_line);
        console.log(last_line);
        var category_label1 = paper.text(text_x_start, - 4 +  y_start + height /2 , first_line)
             .attr({
               "font-family" : "Karla-Regular, Karla",
               "font-size" : 14,
               'text-anchor': 'start'
             });

        var category_label2 = paper.text(text_x_start, 14 + y_start + height /2 , last_line)
            .attr({
              "font-family" : "Karla-Regular, Karla",
              "font-size" : 14,
              'text-anchor': 'start'
            });
      } else {

        var category_label = paper.text(text_x_start, y_start + height /2 , text)
             .attr({
               "font-family" : "Karla-Regular, Karla",
               "font-size" : 14,
               'text-anchor': 'start'
             });
      }



      // console.log(text);
      // console.log(text.length);
      // console.log(category_label.getBBox());

      var barra = paper.path([
       "M", bar_x_start, bar_y_start,
       "L", bar_x_end, bar_y_start,
       "L", bar_x_end, y_end,
       "L", bar_x_start, y_end,
       "L", bar_x_start, bar_y_start])
            .attr({ fill : color,
                    stroke : "none"});



       paper.text(text_x_start + 690, y_start + height /2 , "$"+value)
            .attr({
              "font-family" : "Karla-Regular, Karla",
              "font-size" : 20,
              'text-anchor': 'end',
              'font-weight' : "bold"
            });

       paper.path(["M", x_start, y_start, width, y_start])

       return barra;

    };

    function transferencias_header(){
      paper.circle(12, 15, 9 )
      .attr({
        "fill" : "#23DBB8",
        "stroke" : "none"
      });

      paper.text(28, 17, "Aportes públicos")
      .attr({
        "font-family" : "Karla-Regular, Karla",
        "font-size" : 14,
        'text-anchor': 'start'
      });

      paper.circle(191, 15, 9 )
      .attr({
        "fill" : "#19A58A",
        "stroke" : "none"
      });

      paper.text(207, 17, "Aportes privados")
      .attr({
        "font-family" : "Karla-Regular, Karla",
        "font-size" : 14,
        'text-anchor': 'start'
      });

      paper.text(650, 17, "Datos de "+fecha_seleccionada)
      .attr({
        "font-family" : "Karla-Regular, Karla",
        "font-size" : 25,
        'text-anchor': 'end'
      });

      paper.text(10, header_height + 20, "Concepto")
      .attr({
        "font-family" : "Karla-Regular, Karla",
        "font-size" : 16,
        'text-anchor': 'start',
        'font-weight' : "bold"
      });

      paper.text(360, header_height + 20, "Monto")
      .attr({
        "font-family" : "Karla-Regular, Karla",
        "font-size" : 16,
        'text-anchor': 'start',
        'font-weight' : "bold"
      });
    };

    function transferencias_footer(datos, datos_totales){
      var y_start = header_height +line_height + (datos.length * line_height) + 10;


      paper.text(6, y_start, "TOTAL")
      .attr({
        "font-family" : "Karla-Regular, Karla",
        "font-size" : 26,
        'text-anchor': 'start',
        'font-weight' : "bold"
      });

      paper.text(chart_width - 10, y_start, "$" + (datos_totales.total))
      .attr({
        "font-family" : "Karla-Regular, Karla",
        "font-size" : 26,
        'text-anchor': 'end',
        'font-weight' : "bold"
      });

    };

    var p = transferencias_header();

    for( var x = 0, y = datos.length; x<y; x++ ){
      var color = '#19a58a';
      if (datos[x].text == "Aportes Estatales") {
        color = '#23DBB8';
      }

      var p = transferencia_bar(0, header_height + line_height + (line_height * x) , chart_width, 30, datos[x].value, datos[x].percentage, datos[x].text, color);
    }

    var p = transferencias_footer(datos, datos_totales);
  };

  Raphael.fn.no_data_chart = function(){
    this.text(20 , 20, "No hay datos")
         .attr({
           "font-family" : "Karla-Regular, Karla",
           "font-size" : 30,
           'text-anchor': 'start',
           'font-weight' : "bold"
         });
  }

  Raphael.fn.ingreso_ord_front_header = function(){

    var paper = this;

    paper.circle(12, 15, 9 )
    .attr({
      "fill" : "#23DBB8",
      "stroke" : "none"
    });

    paper.text(28, 17, "Aportes públicos")
    .attr({
      "font-family" : "Karla-Regular, Karla",
      "font-size" : 14,
      'text-anchor': 'start'
    });

    paper.circle(191, 15, 9 )
    .attr({
      "fill" : "#19A58A",
      "stroke" : "none"
    });

    paper.text(207, 17, "Aportes privados")
    .attr({
      "font-family" : "Karla-Regular, Karla",
      "font-size" : 14,
      'text-anchor': 'start'
    });

  };

  Raphael.fn.ingreso_ord_front_bar = function(dato){
    var paper = this;
    var bar_width = 300;
    var bar_height = 30;
    var ingreso_width = (dato.value * (dato.percentage / 100)) * bar_width;
    var color = '#23DBB8';

    if(dato.text == "Aportes Estatales"){
      color = '#23DBB8';
    } else {
      color = '#19a58a';
    }

    var bar = paper.rect(0, 0, ingreso_width, bar_height).attr({
      "fill" : color,
      "stroke" : "none"
    });

  }

  Raphael.fn.ingreso_ord_front_footer = function(dato){
    var paper = this;
    var bar_width = 300;
    var bar_height = 30;
    var publico_width = (dato.publicos / (dato.publicos + dato.privados)) * bar_width;
    var privado_width = bar_width - publico_width;

    var publico_bar = paper.rect(0, 0, publico_width, bar_height).attr({
      "fill" : "#23DBB8",
      "stroke" : "none"
    });

    var privado_bar = paper.rect(publico_width, 0, privado_width, bar_height).attr({
      "fill" : "#19a58a",
      "stroke" : "none"
    });

  }

  Raphael.fn.egreso_ord_front_header = function(){

    var paper = this;

    paper.circle(12, 15, 9 )
    .attr({
      "fill" : "#23DBB8",
      "stroke" : "none"
    });

    paper.text(28, 17, "Egresos de fondos públicos")
    .attr({
      "font-family" : "Karla-Regular, Karla",
      "font-size" : 14,
      'text-anchor': 'start'
    });

    paper.circle(247, 15, 9 )
    .attr({
      "fill" : "#19A58A",
      "stroke" : "none"
    });

    paper.text(263, 17, "Egresos de fondos privados")
    .attr({
      "font-family" : "Karla-Regular, Karla",
      "font-size" : 14,
      'text-anchor': 'start'
    });

  };

  Raphael.fn.egreso_ord_front_bar = function(dato){
    var paper = this;
    var bar_width = 300;
    var bar_height = 30;
    var publico_width = (dato.value_publico / (dato.value_publico + dato.value_privado)) * bar_width * (dato.percentage / 100);
    var privado_width = (bar_width - publico_width) *  (dato.percentage / 100);

    var publico_bar = paper.rect(0, 0, publico_width, bar_height).attr({
      "fill" : "#23DBB8",
      "stroke" : "none"
    });

    var privado_bar = paper.rect(publico_width, 0, privado_width, bar_height).attr({
      "fill" : "#19a58a",
      "stroke" : "none"
    });

  }

  Raphael.fn.egreso_ord_front_footer = function(dato){
    var paper = this;
    var bar_width = 300;
    var bar_height = 30;
    var publico_width = (dato.publicos / (dato.publicos + dato.privados)) * bar_width;
    var privado_width = bar_width - publico_width;

    var publico_bar = paper.rect(0, 0, publico_width, bar_height).attr({
      "fill" : "#23DBB8",
      "stroke" : "none"
    });

    var privado_bar = paper.rect(publico_width, 0, privado_width, bar_height).attr({
      "fill" : "#19a58a",
      "stroke" : "none"
    });

  }

  Raphael.fn.transferencia_front_bar = function(dato){
    var paper = this;
    var bar_width = 300;
    var bar_height = 30;
    var width = bar_width * (dato.percentage / 100);


    var bar = paper.rect(0, 0, width, bar_height).attr({
      "fill" : "#23DBB8",
      "stroke" : "none"
    });

  }

})

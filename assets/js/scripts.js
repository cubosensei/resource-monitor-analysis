const files = [
  "assets/data/(McAfee... sin agente instalado)Rendimiento_HOM102604 2018-12-03 22-11.csv",
  "assets/data/(McAfee... con agente instalado)Rendimiento_HOM102603 2018-12-03 22-08.csv",
  "assets/data/(McAfee... con agente instalado y escaneo)Rendimiento_DSTI101917 2018-12-03 22-06.csv",
  "assets/data/Rendimiento_Equipo1 Kaspersky.csv"
];

files.forEach(function(d,i){
  d3.select('#charts')
    .append('div')
      .attr("class", "row")
      .append('div')
        .attr("class", "card")
        .append('div')
          .attr("class", "card-content")
          .html('<span class="card-title">'+d.replace("assets/data/","")+'</span><div id="chart'+i+'-1" class="col"></div><div id="chart'+i+'-2" class="col"></div><div id="chart'+i+'-3" class="col"></div><div class="clearfix"></div>');
  vegaEmbed("#chart"+i+"-1", {
    "data": {"url": d},
    "layer": [{
      "mark": "bar",
      "encoding": {
        "x": {
          "bin": true,
          "field": "CPU_PERCENTAGE",
          "type": "quantitative",
          "title": "Uso de CPU (%)",
          "scale": {"domain": [0,100]}
        },
        "y": {
          "aggregate": "count",
          "type": "quantitative",
          "title": "Cantidad de mediciones"
        }
      }
    },{
      "mark": "rule",
      "encoding": {
        "x": {
          "aggregate": "mean",
          "field": "CPU_PERCENTAGE",
          "type": "quantitative"
        },
        "color": {"value": "red"},
        "size": {"value": 5}
      }
    }]
  });
  vegaEmbed("#chart"+i+"-2", {
    "data": {"url": d},
    "layer": [{
      "mark": "bar",
      "encoding": {
        "x": {
          "bin": true,
          "field": "MEMORY",
          "type": "quantitative",
          "title": "Uso de Memoria (MB)"
        },
        "y": {
          "aggregate": "count",
          "type": "quantitative",
          "title": "Cantidad de mediciones"
        }
      }
    },{
      "mark": "rule",
      "encoding": {
        "x": {
          "aggregate": "mean",
          "field": "MEMORY",
          "type": "quantitative"
        },
        "color": {"value": "red"},
        "size": {"value": 5}
      }
    }]
  });
  vegaEmbed("#chart"+i+"-3", {
    "data": {"url": d},
    "layer": [{
      "mark": "bar",
      "encoding": {
        "x": {
          "bin": true,
          "field": "MEMORY_PERCENTAGE",
          "type": "quantitative",
          "title": "Uso de Memoria (%)",
        },
        "y": {
          "aggregate": "count",
          "type": "quantitative",
          "title": "Cantidad de mediciones"
        }
      }
    },{
      "mark": "rule",
      "encoding": {
        "x": {
          "aggregate": "mean",
          "field": "MEMORY_PERCENTAGE",
          "type": "quantitative"
        },
        "color": {"value": "red"},
        "size": {"value": 5}
      }
    }]
  });
});

d3.selectAll(".vega-actions a").classed("btn", true);
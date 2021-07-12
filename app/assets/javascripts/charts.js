function dataResult(data){
  let datesTemp = {};

  data.data.forEach(obj => {
    var temps = JSON.parse(obj.attributes.temp_data)
    var dates = obj.attributes.date
    datesTemp[dates] = temps
  });

  return datesTemp;
}


// document.addEventListener('DOMContentLoaded', () => {
//   fetch('/austin/temperature')
//     .then(result => result.json())
//     .then(dataResult)
// });

$(document).ready(() => {
  $.ajax({
    type: 'GET',
    url: '/austin/temperature',
    success: (data) => {
        const result = dataResult(data)
        console.log(Object.keys(result))
        // Create the chart
        Highcharts.stockChart('container', {
          chart: {
              events: {
                  load: function () {

                      // set up the updating of the chart each second
                      var series = this.series[0];
                      setInterval(function () {
                          var x = (new Date()).getTime(), // current time
                              y = Math.round(Math.random() * 100);
                          series.addPoint([x, y], true, true);
                      }, 1000);
                  }
              }
          },

          time: {
              useUTC: false
          },

          rangeSelector: {
              buttons: [{
                  count: 1,
                  type: 'minute',
                  text: '1M'
              }, {
                  count: 5,
                  type: 'minute',
                  text: '5M'
              }, {
                  type: 'all',
                  text: 'All'
              }],
              inputEnabled: false,
              selected: 0
          },

          title: {
              text: 'Weather for Austin HQ'
          },

          exporting: {
              enabled: false
          },

          series: [{
              name: 'Random data',
              data: (function () {
                  // generate an array of random data
                  var data = [],
                      time = (new Date()).getTime(),
                      i;

                  for (i = -999; i <= 0; i += 1) {
                      data.push([
                          time + i * 1000,
                          Math.round(Math.random() * 100)
                      ]);
                  }
                  return data;
              }())
          }]
      });
      }
    });
  }
)



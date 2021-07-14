function dataResult(data){
  let datesTemp = {};

  data.data.forEach(obj => {
    var temps = JSON.parse(obj.attributes.temp_data)
    var dates = obj.attributes.date
    datesTemp[dates] = temps
  });

  return datesTemp;
}

function dataTwoResult(data) {
  let datesTemp = {};

  data.data.forEach(obj => {
    var dates = obj.attributes.date
    var temps = obj.attributes.hourly_temps
    datesTemp[dates] =  temps
  })

  return datesTemp;
}

function graphWeather(data) {
  var results = []

  for (const[key, value]of Object.entries(data)) {
    for (const[key2, value2] of Object.entries(value)){
      dateString = `${key} ${key2}`
      time = new Date(dateString)
      results.push([time.getTime(), parseInt(value2)])
    }
  }

  return results;
}

$(document).ready(() => {
  $.ajax({
    type: 'GET',
    url: '/austin/temperature',
    success: (data) => {
        const result = dataResult(data)
        console.log(result)
        $.ajax({
          type: 'GET',
          url: '/forecasts',
          success: (data2) => {
          const result2 = dataTwoResult(data2)
        // Create the chart
            Highcharts.stockChart('container', {
              chart: {
                  events: {
                      load: function () {
                      }
                  }
              },

              time: {
                  useUTC: false
              },

              rangeSelector: {
                  buttons: [{
                      type: 'current day',
                      text: 'Cd'
                  },{
                    count: 1,
                    type: 'day',
                    text: '1d'
                  },{
                      count: 1,
                      type: 'week',
                      text: '1w'
                  }, {
                      count: 1,
                      type: 'month',
                      text: '1m'
                  },{
                    type: 'All',
                    text: 'All'
                  }],
                  inputEnabled: true,
                  selected: 0
              },

              legend: {
                enabled: true,
                title: ['Historical', 'Forcasts']
              },

              title: {
                  text: 'Weather for Austin HQ'
              },

              exporting: {
                  enabled: false
              },

              series: [{
                  name: 'Historical',
                  data: graphWeather(result)
              },{
                name: 'Forcasts',
                data: graphWeather(result2)
              }]
            });
          }
        })
      }
    });
  }
)



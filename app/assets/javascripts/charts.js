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

  for (const[date, value]of Object.entries(data)) {
    for (const[hour, value2] of Object.entries(value)){
      dateString = `${date} ${hour}`
      time = new Date(dateString)
      results.push([time.getTime(), parseInt(value2)])
    }
  }

  return results;
}

function threeHourTimes(weather) {
  results = []
  for (var [key, value]of Object.entries(weather)) {
    times = Object.keys(value).slice(0, 22)
    for ( i = 0; i < times.length; i++) {
      if (parseInt(times[i]) % 3 === 0 && parseInt(times[i]) > 0){
        results.push(times[i])
      }
    }
  }


  return results.slice(0, 7);
}


function highs(info){
  hash = {}
  for (var [date, value] of Object.entries(info)){
    results = [];
    temps = Object.values(value)
    uint = new Uint8Array(temps)

    results.push(Math.max(...uint.subarray(0, 3)))
    results.push(Math.max(...uint.subarray(3, 6)))
    results.push(Math.max(...uint.subarray(6, 9)))
    results.push(Math.max(...uint.subarray(9, 12)))
    results.push(Math.max(...uint.subarray(12, 15)))
    results.push(Math.max(...uint.subarray(15, 18)))
    results.push(Math.max(...uint.subarray(18, 21)))

    hash[date] = results
  }

  return hash
}

function lows(info2){
  hash = {}
  for (var [date, value] of Object.entries(info2)){
    results = [];
    temps = Object.values(value)
    uint = new Uint8Array(temps)

    results.push(Math.min(...uint.subarray(0, 3)))
    results.push(Math.min(...uint.subarray(3, 6)))
    results.push(Math.min(...uint.subarray(6, 9)))
    results.push(Math.min(...uint.subarray(9, 12)))
    results.push(Math.min(...uint.subarray(12, 15)))
    results.push(Math.min(...uint.subarray(15, 18)))
    results.push(Math.min(...uint.subarray(18, 21)))

    hash[date] = results
  }

  return hash
}

function highandlowData(info, weather){
  var times = threeHourTimes(weather)
  var temps = Object.values(info)
  var dates = Object.keys(info)

  index = 0

  temps.forEach(list => {

    hash = {}
    for (i = 0; i < list.length; i++) {
      hash[times[i]] = list[i]
    }


    info[dates[index]] = hash
    index++;
  })

  return info
}


$(document).ready(() => {
  $.ajax({
    type: 'GET',
    url: '/austin/temperature',
    success: (data) => {
        const result = dataResult(data)
        const setThreeHourWeather = dataResult(data)

        const x = dataResult(data)
        const highData = highandlowData(highs(x), setThreeHourWeather)

        const y = dataResult(data)
        const lowData = highandlowData(lows(y), setThreeHourWeather)

        $.ajax({
          type: 'GET',
          url: '/forecasts',
          success: (data2) => {
          const result2 = dataTwoResult(data2)
        // Create the chart
            Highcharts.stockChart('container', {
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

            Highcharts.stockChart('containerTwo', {
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
                title: ['High', 'Low']
              },

              title: {
                  text: '3-Hour Highs and Lows'
              },

              exporting: {
                  enabled: false
              },

              series: [{
                  name: 'High',
                  data: graphWeather(highData)
              },{
                name: 'Low',
                data: graphWeather(lowData)
              }]
            });
          }
        })
      }
    });
  }
)



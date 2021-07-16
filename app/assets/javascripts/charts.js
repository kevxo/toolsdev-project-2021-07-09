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

function threeHourWeather(weather) {
  for (const[key, value]of Object.entries(weather)) {
    for (const[time, value2] of Object.entries(value)) {
      if (parseInt(time) % 3 != 0) {
        delete value[time]
      }
    }
  }

  return weather;
}


function highs(info){
  for (const[date, value] of Object.entries(info)){
    let largestNumber = value['0:00']

    for (const[time, temp] of Object.entries(value)) {

      if (largestNumber < temp){
        largestNumber = temp
      }

      value[time] = largestNumber
    }
  }

  return info
}

function lows(info2){
  for (const[date, value] of Object.entries(info2)){
    let smallestNumber = value['0:00']

    for (const[time, temp] of Object.entries(value)) {

      if (smallestNumber > temp){
        smallestNumber = temp
      }

      value[time] = smallestNumber
    }
  }

  return info2
}


$(document).ready(() => {
  $.ajax({
    type: 'GET',
    url: '/austin/temperature',
    success: (data) => {
        const result = dataResult(data)
        console.log(result);
        const x = dataResult(data)
        const y = dataResult(data)

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
                  data: graphWeather(highs(threeHourWeather(x)))
              },{
                name: 'Low',
                data: graphWeather(lows(threeHourWeather(y)))
              }]
            });
          }
        })
      }
    });
  }
)



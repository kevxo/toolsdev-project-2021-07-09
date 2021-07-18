class WeatherFacade
  def self.weather
    results = WeatherService.retrieve_weather
    results.map do |data|
      hash = {}
      date = data[:date]

      data[:hourly].each do |ele|
        hour = ele[:time].to_i / 100
        time = "#{hour}:00"
        temp = ele[:tempF]

        hash[time] = temp
      end

      find_weather(date, hash)
    end
  end

  def self.find_weather(date, hash)
    weather = Weather.find_by(date: date)

    if weather
      weather.update(date: date, temp_data: hash.to_json)
    else
      weather = Weather.new(date: date, temp_data: hash.to_json)
      weather.save
    end
  end
end
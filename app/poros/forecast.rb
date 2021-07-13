class Forecast
  attr_reader :date, :hourly_temps
  def initialize(data)
    @date = data[:date]
    @hourly_temps = temps(data)
  end

  def temps(data)
    hash = {}

    data[:hourly].each do |value|
      hour = value[:time].to_i / 100
      time = "#{hour}:00"
      temp = value[:tempF]

      hash[time] = temp
    end

    return hash
  end
end
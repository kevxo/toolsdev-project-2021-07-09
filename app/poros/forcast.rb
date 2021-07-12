class Forcast
  attr_reader :date, :hourly_temps
  def initialize(data)
    @date = data[:date]
    @hourly_temps = temps(data)
  end

  def temps(data)
    hash = {}

    data[:hourly].each do |value|
      hour = value[:time]
      temp = value[:tempF]

      hash[hour] = temp
    end

    return hash
  end
end
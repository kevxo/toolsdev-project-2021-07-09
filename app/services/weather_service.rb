require 'date'

class WeatherService
  def self.retrieve_weather
    today = Date.today
    month_ago = Date.today - 30

    response = conn.get('/premium/v1/past-weather.ashx') do |req|
      req.params[:q] = '30.404251,-97.849442'
      req.params[:format] = 'json'
      req.params[:tp] = '1'
      req.params[:key] = ENV['KEY']
      req.params[:date] = month_ago.strftime('%F')
      req.params[:enddate] = today.strftime('%F')
    end

    JSON.parse(response.body, symbolize_names: true)[:data][:weather]
  end

  def self.conn
    Faraday.new(url: 'https://api.worldweatheronline.com')
  end
end
require 'date'

class WeatherController < ApplicationController
  def index
    conn = Faraday.new(url: 'https://api.worldweatheronline.com')

    today = Date.today
    month_ago = Date.today - 30

    response = conn.get('/premium/v1/past-weather.ashx') do |req|
      req.params[:q] = '30.404251,-97.849442'
      req.params[:format] = 'json'
      req.params[:tp] = '3'
      req.params[:key] = ENV['KEY']
      req.params[:date] = month_ago.strftime('%F')
      req.params[:enddate] = today.strftime('%F')
    end

    json = JSON.parse(response.body, symbolize_names: true)[:data][:weather]

    json.map do |data|
      hash = {}
      date = data[:date]

      data[:hourly].each do |hour|
        time = hour[:time]
        temp = hour[:tempF]

        hash[time] = temp
      end

      weather = Weather.new(date: date, temp_data: hash.to_json)

      weather.save
    end

    @weathers = Weather.all
    require 'pry' ; binding.pry
  end
end
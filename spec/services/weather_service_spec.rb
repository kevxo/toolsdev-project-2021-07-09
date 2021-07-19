require 'rails_helper'

RSpec.describe WeatherService do
  describe 'retrieve weather' do
    it 'returns weather data', :vcr do
      weather_data = WeatherService.retrieve_weather.first

      expect(weather_data).to have_key(:date)
      expect(weather_data[:date]).to be_a String

      expect(weather_data).to have_key(:hourly)
      expect(weather_data[:hourly]).to be_a Array

      expect(weather_data[:hourly].first).to have_key(:time)
      expect(weather_data[:hourly].first[:time]).to be_a String

      expect(weather_data[:hourly].first).to have_key(:tempF)
      expect(weather_data[:hourly].first[:tempF]).to be_a String
    end
  end
end
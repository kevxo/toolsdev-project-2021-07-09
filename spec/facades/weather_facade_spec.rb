require 'rails_helper'

RSpec.describe WeatherFacade do
  it 'should return a list historical data that exists', :vcr do
    weather_data = WeatherFacade.weather
    weather_in_db = Weather.all

    expect(weather_data).to be_a Array
    expect(weather_data.length).to eq(weather_in_db.length)
  end
end
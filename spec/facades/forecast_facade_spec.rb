require 'rails_helper'

RSpec.describe ForecastFacade do
  it 'should return a list of forecasts objects', :vcr do
    forecast = ForecastFacade.forecast

    expect(forecast).to be_a Array
    expect(forecast.first).to be_a Forecast

    expect(forecast.first.date).to be_a String
    expect(forecast.first.houlry_temps).to be_a Hash
  end
end
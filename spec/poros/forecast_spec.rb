require 'rails_helper'

RSpec.describe Forecast do
  it 'exists' do
    data = {
      date: '2021-10-10',
      hourly: [{
        time: '400',
        tempF: '78'
      }]
    }

    forecast = Forecast.new(data)

    expect(forecast).to be_a Forecast
    expect(forecast.date).to eq('2021-10-10')
    expect(forecast.hourly_temps).to eq({"4:00" => "78"})
  end
end
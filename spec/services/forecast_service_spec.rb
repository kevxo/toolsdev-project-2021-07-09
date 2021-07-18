require 'rails_helper'

RSpec.describe ForecastsService do
  describe 'Current Forcasts' do
    it 'should return current forecasts data', :vcr do
      current_data = ForecastsService.current_forecasts

      expect(current_data.length).to eq(2)

      expect(current_data.first).to have_key(:date)
      expect(current_data.first[:date]).to be_a String

      expect(current_data.first).to have_key(:hourly)
      expect(current_data.first[:hourly].first).to have_key(:time)
      expect(current_data.first[:hourly].first[:time]).to be_a String


      expect(current_data.first[:hourly].first).to have_key(:tempF)
      expect(current_data.first[:hourly].first[:tempF]).to be_a String
    end
  end
end
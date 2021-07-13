require 'rails_helper'

RSpec.describe 'Forcasts API' do
  describe 'Current Austin Weather' do
    it 'should retreive current weather', :vcr do
      get '/forecasts'

      expect(response).to be_successful

      json = JSON.parse(response.body, symbolize_names: true)[:data]

      json.each do |data|
        expect(data).to have_key(:id)
        expect(data[:id]).to eq(nil)

        expect(data).to have_key(:type)
        expect(data[:type]).to eq('forecast')

        expect(data).to have_key(:attributes)
        expect(data[:attributes].keys).to eq(%i[date hourly_temps])

        expect(data[:attributes][:date]).to be_a String
        expect(data[:attributes][:hourly_temps]).to be_a Hash
      end
    end
  end
end
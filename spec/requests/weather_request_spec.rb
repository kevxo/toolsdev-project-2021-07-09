require 'rails_helper'

RSpec.describe 'Weather API' do
  describe 'Austin Weather' do
    it 'retrieves data', :vcr do
      get '/austin/temperature'

      expect(response).to be_successful

      json = JSON.parse(response.body, symbolize_names: true)[:data]

      json.each do |data|
        expect(data).to have_key(:id)
        expect(data[:id]).to be_a String

        expect(data).to have_key(:type)
        expect(data[:type]).to eq('weather')

        expect(data).to have_key(:attributes)
        expect(data[:attributes].keys).to eq(%i[date temp_data])

        expect(data[:attributes][:date]).to be_a String
        expect(data[:attributes][:temp_data]).to be_a String
        expect(JSON.parse(data[:attributes][:temp_data])).to be_a Hash
      end
    end
  end
end
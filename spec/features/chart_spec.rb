require 'rails_helper'

RSpec.describe 'Austin Temperature chart' do
  describe 'Index Page' do
    it 'should see both charts of the temperature', :vcr do
      visit '/austin/temperature'

      expect(page).to have_content('Weather for Austin HQ')
    end
  end
end
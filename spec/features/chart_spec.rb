require 'rails_helper'

RSpec.describe 'Austin Temperature chart' do
  describe 'Index Page' do
    it 'should see both charts of the temperature', :vcr do
      visit '/charts'

      expect(page).to have_content('Austin HQ')
      expect(page).to have_css('#container')
      expect(page).to have_css('#containerTwo')
    end
  end
end
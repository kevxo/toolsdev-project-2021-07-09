require 'clockwork'
include Clockwork

require File.expand_path('../../config/boot', __FILE__)

require File.expand_path('../../config/environment', __FILE__)

require 'clockwork'

include Clockwork

module Clockwork

  every(1.hour, 'hourly.job -- Weather.update_everything') do |job|
    WeatherFacade.weather
  end
end
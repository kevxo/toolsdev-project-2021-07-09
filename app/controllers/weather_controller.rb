class WeatherController < ApplicationController
  before_action :collect_weather

  def index
    @weathers = Weather.all
    require 'pry' ; binding.pry
  end

  private

  def collect_weather
    WeatherFacade.weather
  end
end
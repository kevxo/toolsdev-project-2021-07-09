class WeatherController < ApplicationController
  before_action :collect_weather

  def index
    render json: WeatherSerializer.new(Weather.all)
  end

  private

  def collect_weather
    WeatherFacade.weather
  end
end
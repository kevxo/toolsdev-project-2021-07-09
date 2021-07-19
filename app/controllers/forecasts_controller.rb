class ForecastsController < ApplicationController
  def index
    forecasts = ForecastFacade.forecast

    render json: ForecastSerializer.new(forecasts)
  end
end
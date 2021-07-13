class ForecastFacade
  def self.forecast
    forecasts = ForecastsService.current_forecasts

    forecasts.map do |data|
      Forecast.new(data)
    end
  end
end
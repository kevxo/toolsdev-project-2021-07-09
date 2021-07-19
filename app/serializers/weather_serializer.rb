class WeatherSerializer
  include FastJsonapi::ObjectSerializer

  attributes :date, :temp_data
end
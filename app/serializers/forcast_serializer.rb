class ForcastSerializer
  include FastJsonapi::ObjectSerializer

  set_id {nil}

  attributes :date, :hourly_temps
end
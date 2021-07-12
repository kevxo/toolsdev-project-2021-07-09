class ForcastFacade
  def self.forcast
    forcasts = ForcastsService.current_forcasts

    forcasts.map do |data|
      Forcast.new(data)
    end
  end
end
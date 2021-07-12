class ForcastsController < ApplicationController
  def index
    forcasts = ForcastFacade.forcast

    render json: ForcastSerializer.new(forcasts)
  end
end
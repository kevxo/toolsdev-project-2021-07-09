Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  root 'charts#index'

  get '/austin/temperature', to: 'weather#index'
  get '/charts', to: 'charts#index'
end

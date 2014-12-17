Rails.application.routes.draw do
  root to: 'application#index'
  resources :users, only: [:show, :new, :create, :destroy]

  get '/sessions/new' => 'sessions#new', as: 'login'
  post '/sessions' => 'sessions#create'
  delete '/sessions' => 'sessions#destroy'

  #get # will make a call to the api and return what was found


end

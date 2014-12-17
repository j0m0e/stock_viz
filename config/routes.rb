Rails.application.routes.draw do
  # root to: 'application#index'
  # resources :users, only: [:show, :new, :create, :destroy]

   #get '/sessions/new' => 'sessions#new', as: 'login'
   get '/get_stock/:ticker' => 'stocks#get_stock'
  # post '/sessions' => 'sessions#create'
  # delete '/sessions' => 'sessions#destroy'

  #get # will make a call to the api and return what was found

  root to: 'application#index'
  resources :users
  resources :portfolios
  resources :stocks


end

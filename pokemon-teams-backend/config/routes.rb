Rails.application.routes.draw do
  resources :pokemons
  get '/trainers', to: 'trainers#index'
  get '/trainers/:id', to:'trainers#show'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end

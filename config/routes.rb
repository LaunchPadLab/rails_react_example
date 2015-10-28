Rails.application.routes.draw do
  devise_for :users
  root to: 'questions#index'
  resources :questions
  resources :answers

  get   '/account', to:'accounts#edit', as: 'account'
  patch '/account', to:'accounts#update'
end

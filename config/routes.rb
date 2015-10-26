Rails.application.routes.draw do
  devise_for :users
  root to: 'questions#index'
  resources :questions
  resources :answers
end

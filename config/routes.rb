Rails.application.routes.draw do
  root to: 'static_pages#root'

  namespace :api, defaults: { format: :json } do
    resources :users, only: [:create, :show] do
      resources :boards, only: [:index]
      resources :pinnings, only: [:index]
      get 'followers', on: :member
      get 'following', on: :member
    end
    resource :session, only: [:create, :destroy]
    resources :pins, only: [:create]
    resources :pinnings, only: [:create, :destroy]
    resources :boards, only: [:create, :destroy, :show, :update] do
      resources :pinnings, only: [:index]
    end
  end
end
